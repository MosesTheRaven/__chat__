<template>
    <v-toolbar class="py-3">
        <v-toolbar-side-icon v-if="this.$mq === 'sm'">
            <v-avatar class="ml-4" @click="emitToChat">
                    <i class="blue--text text--darken-2 fas fa-arrow-left"></i>
                </v-avatar>
                <v-avatar color="secondary" class="ml-2">
                    <v-icon class="white--text ">forum</v-icon>
                </v-avatar>
        </v-toolbar-side-icon>
        <v-toolbar-side-icon v-else>
            <v-avatar color="secondary" class="ml-2">
                <v-icon class="white--text ">forum</v-icon>
            </v-avatar>
        </v-toolbar-side-icon>
        <v-toolbar-title class="px-4">{{ getCurrentConversation }}</v-toolbar-title>
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

