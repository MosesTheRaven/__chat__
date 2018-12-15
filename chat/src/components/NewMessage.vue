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
                      <div class="headline">File name: <strong>{{ file.name }}</strong></div>
                      <div>Autor: <strong>{{ getUserData.name }}</strong></div>
                      <div>
                          <input v-if="!fileUploaded" type="file" value="upload" id="fileButton" @change="(event)=>getFile(event)">
                          <span color="error">{{ error }}</span>
                          <v-text-field label="File description" auto-grow v-model="file.description"></v-text-field>
                      </div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs4 offset-xs2 class="py-4">
                    <v-progress-circular v-if="!fileUploaded" :rotate="360" :size="100" :width="15" :value="fileUploadStatus" color="secondary">
                        {{ fileUploadStatus }}
                    </v-progress-circular>
                    <span v-else class="display-4">
                        <i :class="fileTypes[file.type]"></i>
                    </span>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                  <v-flex justify-end></v-flex>
                  <v-btn flat color="error" @click="discard">Discard</v-btn>
                  <v-btn :disabled="!fileUploaded" color="secondary" @click="specialSendMessage">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-bottom-sheet>
    
    </v-flex>
</template>
<script>
import * as firebase from 'firebase'
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
            file : {
                name : "",
                description : "",
                type : "",
                path : ""
            },
            fileUploadStatus : 0,
            error : "",
            fileUploaded : false,
            fileStorageRef : '',
            fileTypes : {
                '' : 'fas fa-file',

                'zip' : 'fas fa-file-archive',
                'rar' : 'fas fa-file-archive',
                '7z' : 'fas fa-file-archive',
                'gz' : 'fas fa-file-archive',

                'pdf' : 'fas fa-file-pdf',

                'pps' : 'fas fa-file-powerpoint',
                'ppt' : 'fas fa-file-powerpoint',
                'pptx' : 'fas fa-file-powerpoint',


                'doc' : 'fas fa-file-word',
                'docx' : 'fas fa-file-word',
                'odt' : 'fas fa-file-alt',
                'txt' : 'fas fa-file-alt',
                
                'bmp' : 'fas fa-file-image',
                'dds' : 'fas fa-file-image',
                'gif' : 'fas fa-file-image',
                'jpg' : 'fas fa-file-image',
                'png' : 'fas fa-file-image',
                'psd' : 'fas fa-file-image',
                'tga' : 'fas fa-file-image',
                'thm' : 'fas fa-file-image',
                'tif' : 'fas fa-file-image',
                'tiff' : 'fas fa-file-image',
                'yuv' : 'fas fa-file-image',

                'xlr' : 'fas fa-file-excel',
                'xls' : 'fas fa-file-excel',
                'xlsx' : 'fas fa-file-excel',

                'mp3' : 'fas fa-file-audio',
                'wav' : 'fas fa-file-audio',
                'midi' : 'fas fa-file-audio',
                'wma' : 'fas fa-file-audio',
                'flac' : 'fas fa-file-audio',
                
                'avi' : 'fas fa-file-video',
                'mp4' : 'fas fa-file-video',
                '3gp' : 'fas fa-file-video',
   
            }
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
        getFile(event){
            var file = event.target.files[0]
            this.file.name = file.name
            this.file.type = this.file.name.split(".")[this.file.name.split(".").length - 1] 
            this.fileStorageRef = firebase.storage().ref('conversations/' + this.getCurrentConversation + '/' + file.name)

            var task = this.fileStorageRef.put(file) 


            task.on('state_changed', (snapshot) => this.progress(snapshot), (err) => this.handleFileError(err), () => this.complete())

        },
        progress(snapshot){
            this.fileUploadStatus = Math.ceil(100 * (snapshot.bytesTransferred / snapshot.totalBytes))      
        },
        handleFileError(err){
            this.error = err.message
        },
        complete(){
            this.fileStorageRef.getDownloadURL()
            .then((url)=>{
                this.file.path = url
                this.fileUploaded = true;
            })
        },
        specialSendMessage(){
            var fileMessage = 'uploaded ' + this.file.name
            fileMessage += this.file.description === "" ? '' : ' with a description : ' + this.file.description
            var messageObject = {
                    content : fileMessage,
                    sender : {
                        name : this.getUserData.name,
                        uid : this.getUserData.uid 
                    },
                    file : this.file,
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

