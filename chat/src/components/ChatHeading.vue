<template>
    <div>
        <v-list-tile avatar class="py-3" style="box-shadow : 0px 4px 50px -10px #1E88E5 !important;">
            <v-list-tile-avatar v-if="this.$mq === 'sm'" @click="emitToChat">
                <v-avatar class="ml-4">
                    <i class="blue--text text--darken-2 fas fa-arrow-left"></i>
                </v-avatar>
                <v-avatar color="secondary" class="ml-2">
                    <v-icon class="white--text ">forum</v-icon>
                </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-avatar v-else>
                <v-avatar class="secondary">
                    <v-icon class="white--text ">forum</v-icon>
                </v-avatar>
            </v-list-tile-avatar>
            <v-flex column wrap class="ml-3">
                <span class="headline font-weight-bold">{{ getCurrentConversation }}</span>
                <span >({{ getCurrentConversationUsers }} users)</span>
            </v-flex>
            
        </v-list-tile>  
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    name : 'ChatHeading',
    data() {
        return {
            conversation : {
                name : 'Conversation name loading',
                users : 'Loading'
            }
        }
    },
    computed :{
        ...mapGetters(['getCurrentConversation', 'getCurrentConversationUsers'])
    },
    methods : {
        emitToChat(){
            this.$emit('emitLeftDrawer')
        }
    }
}
</script>

