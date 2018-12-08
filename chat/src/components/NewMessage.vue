<template>
    <v-flex>
        <v-form @submit.prevent="initiateMessageSend">
            <v-text-field label="type message here.." v-model="message"/>
        </v-form>   
    </v-flex>
    
</template>
<script>
import * as FirebaseAPI from 'firebase'
import { mapActions, mapGetters } from 'vuex'

export default {
    name : 'NewMessage',
    data(){
        return{
            message : '',
        }
    },
    computed : {
        ...mapGetters(['getUserData', 'getCurrentConversation']),
    },
    methods: {
        ...mapActions(['sendMessage']),
    
        initiateMessageSend() {
            if(this.message != ""){
                var messageObject = {
                    content : this.message,
                    sender : {
                        name : this.getUserData.name,
                        uid : this.getUserData.uid 
                    },
                    collection : this.getCurrentConversation
                }
                console.log(this.getCurrentConversation, messageObject)
                this.sendMessage(messageObject)
                this.message = "" 
            }
        }
    }

}
</script>
