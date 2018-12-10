<template>
    <v-toolbar color="secondary" dark fixed app clipped-left>
        <v-toolbar-side-icon @click.stop="clicked" >
            <i class="fas fa-bars" ></i>
        </v-toolbar-side-icon>
        <v-toolbar-title class="text-white">Work Chat</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>    
</template>

<script>
export default {
    name : 'Toolbar',
    data(){
        return {
        }
    },
    methods : {
        clicked(){
            this.$emit('clicked', 'openRightDrawer')
        }
    }
}    
</script>

<style scoped>
</style>
