<template>
    <v-flex  style="width : 100%; position : absolute; bottom : 0px">
        <!-- style="height : 70px; position : absolute; bottom : 0px; -->
        <v-form class="px-2" @submit.prevent="initiateMessageSend">
            <v-text-field 
            box 
            label="type message here.." 
            v-model="message"
            :append-icon="marker ? 'mdi-upload' : 'mdi-upload'"
            :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
            
            :prepend-icon="icon"
            
            clear-icon="mdi-close-circle"
            clearable

            @click:append-outer="initiateMessageSend"
            @click:append="openBottomSheet"
            @click:prepend="changeIcon"
            @click:clear="clearMessage"
            />
        </v-form>   
        <v-bottom-sheet v-model="bottomSheet" inset>
            <v-flex xs12>
            <v-card >
              <v-layout row >
                <v-flex xs4 offset-xs2>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">File name: <strong>file.pdf</strong></div>
                      <div>Autor: <strong>{{ getUserData.name }}</strong></div>
                      <div>
                          <v-text-field label="File description" auto-grow v-model="fileDescription"></v-text-field>
                      </div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs4 offset-xs2 class="display-4 py-4">
                  <i class="far fa-file-pdf"></i>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                  <v-flex justify-end></v-flex>
                  <v-btn flat color="error" @click="discard">Discard</v-btn>
                  <v-btn color="secondary" @click="specialSendMessage">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-bottom-sheet>
    
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
            ],
            bottomSheet: false,
            fileDescription : ""
        }
    },
    computed : {
        ...mapGetters(['getUserData', 'getCurrentConversation']),
        icon () {
            return this.icons[this.iconIndex]
        }
    },
    methods: {
        ...mapActions(['sendMessage', 'sendNotification']),
    
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
        },
        openBottomSheet(){
            this.bottomSheet = true;
        },
        specialSendMessage(){
            var messageObject = {
                    content : this.getUserData.name + ' uploaded file.pdf with a description : ' + this.fileDescription,
                    sender : {
                        name : this.getUserData.name,
                        uid : this.getUserData.uid 
                    },
                    collection : this.getCurrentConversation
                }
            this.sendMessage(messageObject)
            this.sendNotification('File sent')
            this.discard()
        },
        discard(){
            this.sendNotification('File discarded')
            this.bottomSheet = false
            this.fileDescription = ""
        }
    }

}
</script>

