<template>
    <ul class="messages" v-chat-scroll>
        <p v-if="messages.length == 0">Conversation is loading</p>
        <li v-else v-for="(message, index) in messages" :key="index">
            <v-flex row class="py-1">
                <v-flex v-if="messages[index-1 < 0 ? 0 : index-1].sender.name != messages[index].sender.name" xs3>
                    <v-avatar size="30" class="message-sender-avatar ">
                        <i :class="'far ' + message.sender.avatar"></i>
                        <!-- <v-icon>account_circle</v-icon> -->
                    </v-avatar>
                    <span class="message-sender">
                        {{message.sender.name}}
                    </span>
                </v-flex>
                <v-flex xs9>
                    <p class="message-content" style="overflow : hidden">{{message.content}}</p>
                    <!-- :href="message.file.path" -->
                    <span class="message-content" v-if="message.file"><a style="font-size : 12px; color : rgb(219, 106, 12) !important" @click="type=message.file.type; source= message.file.path; dialog=true" >PREVIEW</a></span>
                </v-flex>
            </v-flex>
        </li>
        <v-dialog v-model="dialog" persistent max-height="700" max-width="500">
            <v-card>
                <v-card-title class="headline" primary-title>
                    File preview
                </v-card-title>
                <v-responsive>
                    <v-img v-if="imgTypes.includes(type)" :src="source"></v-img>
                    <audio v-else-if="musicTypes.includes(type)" controls>
                        <source :src="source">
                    </audio>
                    <video v-else-if="videoTypes.includes(type)" width="500" controls>
                        <source :src="source">
                    </video>
                    <p style="margin-left : 18px" v-else>File preview not available</p>
                </v-responsive>
                <v-divider></v-divider>
                <v-card-actions style="justify-content : flex-end">
                    <v-btn flat color="secondary" @click="nullSource()">Close</v-btn>
                    <v-btn color="secondary" @click="nullSource()">
                        <a target="_blank" :href="source" class="white--text" style="text-decoration : none">
                            Save
                        </a> 
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </ul>
</template>

<script>
import FirebaseAPI from '../firebase/firebaseAPI'
import { mapGetters, mapActions } from 'vuex'
import pdf from 'vue-pdf'

export default {
    name : 'ChatWindow',
    components : {
        pdf
    },
    data(){
        return {
            messages : [],
            dialog : false,
            source : "",
            type : "",
            imgTypes : [ 'bmp', 'dds', 'gif', 'jpg', 'png', 'psd', 'tga', 'thm', 'tif', 'tiff', 'yuv'],
            musicTypes : ['mp3', 'wav', 'midi', 'wma', 'flac'],
            videoTypes : ['avi', 'mp4', '3gp', 'mkv']
        }
    },
    methods : {
        ...mapActions(['setNewCurrentConversation']),
        nullSource(){
            this.source = "",
            this.dialog = false
        }
    },
    computed : {
        ...mapGetters(['getCurrentConversation'])
    },
    watch :{
        getCurrentConversation : function(){
            if(this.getCurrentConversation != ''){
                this.messages = []
                let ref = FirebaseAPI.firestore.getCollection(this.getCurrentConversation)
                ref.onSnapshot((snapshot)=>{
                    snapshot.docChanges().forEach(change=>{
                        if(change.type == "added"){
                            let messageObject = {
                                sender : {
                                    name : change.doc.data().name,
                                    uid : change.doc.data().uid,
                                    avatar : change.doc.data().avatar ? change.doc.data().avatar : 'fa-user',
                                },
                                content : change.doc.data().content,
                                timestamp : change.doc.data().timestamp
                            }
                            if (change.doc.data().file){
                                messageObject.file = change.doc.data().file
                            }
                            var addMessageBool = true
                            this.messages.forEach(iteratedMessage=>{
                                if (iteratedMessage.timestamp == messageObject.timestamp) addMessageBool = false
                            })
                            if(addMessageBool) this.messages.push(messageObject)
                        }
                    })
                })
            }
        }
    },
}
</script>

<style>
    .messages {
        padding-left : 10px;
        overflow: auto;
        list-style-type: none;
    }
    .messages li:first-child .message-content:nth-child(2){
        display: none
    }
    @media screen and (max-width: 769px){
        .messages {
            max-height: calc(100vh - 150px)
        }
    }
    @media screen and (min-width: 769px){
        .messages {
            max-height: calc(100vh - 250px)
        }
    }
    .message-sender-avatar{
        margin-top : -5px;
        font-size : 1.5em;
    }
    .message-sender{
        margin-top : 5px !important;
        font-size: 1.25em;
        color : #1565C0;
    }
    .message-content{
        padding-left : 33px;
        margin-bottom : 0px;
    }

    .messages::-webkit-scrollbar{
        width : 5px;
    }
    .messages::-webkit-scrollbar-track{
        /* background : white; */
    }   
    .messages::-webkit-scrollbar-thumb{
        border-radius : 5px;
        background : rgba(30,136,229,.2);
        box-shadow: 0 0 50px -10px #1E88E5 !important;
    } 
</style>
