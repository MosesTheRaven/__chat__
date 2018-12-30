<template>
    <v-toolbar  :class="this.$mq != 'sm' ? 'blue darken-1' : 'white'" 
                :dark="this.$mq != 'sm'"

                fixed 
                app 
                clipped-left
                :style="this.$mq === 'sm' ? 'box-shadow : 0px 4px 50px -10px #1E88E5 !important;' : ''">
        <v-toolbar-side-icon v-if="this.$mq == 'sm'" @click.stop="clickedLeft" class="headline">
            <i class="fas fa-bars" ></i>
        </v-toolbar-side-icon>
        <v-toolbar-side-icon v-else @click.stop="clickedLeft" class="headline">
            <i class="fas fa-bars" ></i>
        </v-toolbar-side-icon>
        <v-toolbar-title class="text-white">
            
            <!-- {{ this.$mq !== 'sm' ? 'WorkChat' : getCurrentConversation }} -->
            <div v-if="this.$mq !== 'sm'">
                <span class="headline">WorkChat</span>
            </div>
            <span v-else>
                {{ getCurrentConversation }}
            </span>
            </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon v-if="this.$mq == 'sm'"  @click.stop="clickedRight" class="headline">
            <i class="far fa-info-circle"></i>
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
