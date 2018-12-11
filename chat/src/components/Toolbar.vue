<template>
    <v-toolbar color="secondary" dark fixed app clipped-left>
        <v-toolbar-side-icon @click.stop="clickedLeft">
            <i class="fas fa-bars" ></i>
        </v-toolbar-side-icon>
        <v-toolbar-title class="text-white">{{ this.$mq !== 'sm' ? 'WorkChat' : getCurrentConversation }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon v-if="this.$mq == 'sm'"  @click.stop="clickedRight">
            <i class="fas fa-bars" ></i>
        </v-toolbar-side-icon>
    </v-toolbar>    
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name : 'Toolbar',
    data(){
        return {
            title : 'WorkChat'  
        }
    },
    computed : {
        ...mapGetters(['getCurrentConversation'])
    },
    methods : {
        clickedLeft(){
            this.$emit('clickedLeft')
        },
        clickedRight(){
            this.$emit('clickedRight')
        }
    }
}    
</script>

<style scoped>
</style>
