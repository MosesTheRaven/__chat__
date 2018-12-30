<template>
    <v-toolbar  class="py-3" 
                :style="this.$mq !== 'sm' ? 'box-shadow : 0px 4px 50px -10px #1E88E5 !important;' : ''">
        <v-toolbar-side-icon v-if="this.$mq === 'sm'">
            <v-avatar class="ml-4" @click="emitToChat">
                    <i class="blue--text text--darken-2 fas fa-bars"></i>
                </v-avatar>
                <v-avatar color="secondary" class="ml-2">
                    <v-icon class="white--text ">forum</v-icon>
                </v-avatar>
        </v-toolbar-side-icon>
        <v-toolbar-side-icon v-else>
            <v-avatar color="secondary">
                <v-icon class="white--text ">forum</v-icon>
            </v-avatar>
        </v-toolbar-side-icon>
        <v-toolbar-title class="px-4" :style="this.$mq === 'sm' ? '' : 'margin-top : 10px'">{{ getCurrentConversation }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn icon @clicked.stop="toggleRightDrawer">
            <i class="fas fa-bars" ></i>
        </v-btn> -->
    </v-toolbar>
</template>

<script>
import {mapGetters} from 'vuex'


export default {
    name : 'ImprovedChatHeading',
    
    data() {
        return {
            conversation : {
                name : 'Conversation name loading',
                users : 'Loading'
            }
        }
    },
    computed :{
        ...mapGetters(['getCurrentConversation', 'getCurrentConversationUsers', 'getCurrentProjectConversation'])
    },
    methods : {
        emitToChat(){
            this.$emit('clickedRight')
        }
    }
}
</script>

