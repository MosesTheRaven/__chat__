<template>
    <v-flex  style="width : 100%; position : absolute; bottom : 0px">
        <!-- style="height : 70px; position : absolute; bottom : 0px; -->
        <v-form class="px-2" @submit.prevent="initiateMessageSend">
            <v-text-field 
            box 
            label="type message here.." 
            v-model="message"
            :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
            :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
            
            :prepend-icon="icon"
            
            clear-icon="mdi-close-circle"
            clearable

            @click:append-outer="initiateMessageSend"
            @click:prepend="changeIcon"
            @click:clear="clearMessage"
            />
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
            iconIndex: 0,
            show: false,
            marker : true,
            icons: [
                'mdi-emoticon',
                'mdi-emoticon-cool',
                'mdi-emoticon-dead',
                'mdi-emoticon-excited',
                'mdi-emoticon-happy',
                'mdi-emoticon-neutral',
                'mdi-emoticon-sad',
                'mdi-emoticon-tongue'
            ]
        }
    },
    computed : {
        ...mapGetters(['getUserData', 'getCurrentConversation']),
        icon () {
            return this.icons[this.iconIndex]
        }
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
                this.sendMessage(messageObject)
                this.clearMessage() 
            }
        },
        clearMessage () {
            this.message = ''
        },
        resetIcon () {
            this.iconIndex = 0
        },
        changeIcon () {
            this.iconIndex === this.icons.length - 1
            ? this.iconIndex = 0
            : this.iconIndex++
        }
    }

}
</script>
