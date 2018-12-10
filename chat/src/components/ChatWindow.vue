<template>
    <ul class="messages" v-chat-scroll>
        <p v-if="messages.length == 0">Conversation is loading</p>
        <li v-else v-for="(message, index) in messages" :key="index">
            <v-flex row  class="py-1">
                <v-avatar size="30" class="message-sender-avatar ">
                    <v-icon>account_circle</v-icon>
                </v-avatar>
                <span class="message-sender">
                        {{message.sender.name}}
                </span>
                <p class="message-content">{{message.content}}</p>
            </v-flex>
        </li>
    </ul>
</template>

<script>
import FirebaseAPI from '../firebase/firebaseAPI'
import { mapGetters, mapActions } from 'vuex'

export default {
    name : 'ChatWindow',
    data(){
        return {
            messages : [],
        }
    },
    methods : {
        ...mapActions(['setNewCurrentConversation']),
    },
    computed : {
        ...mapGetters(['getCurrentConversation'])
    },
    watch :{
        getCurrentConversation : function(){
            this.messages = []
            let ref = FirebaseAPI.firestore.getCollection(this.getCurrentConversation)
            // let newMessages = []
            ref.onSnapshot((snapshot)=>{
                snapshot.docChanges().forEach(change=>{
                    if(change.type == "added"){
                        let messageObject = {
                            sender : {
                                name : change.doc.data().name,
                                uid : change.doc.data().uid
                            },
                            content : change.doc.data().content,
                            timestamp : change.doc.data().timestamp
                        }
                        var addMessageBool = true
                        this.messages.forEach(iteratedMessage=>{
                            if (iteratedMessage.timestamp == messageObject.timestamp) addMessageBool = false
                        })
                        if(addMessageBool) this.messages.push(messageObject)
                        // newMessages.push(messageObject)
                    }
                })
                // this.messages = newMessages
            })
        }
    },
    created(){
        this.messages = []
        let ref = FirebaseAPI.firestore.getCollection(this.getCurrentConversation)
        // let newMessages = []
        ref.onSnapshot((snapshot)=>{
            snapshot.docChanges().forEach(change=>{
                if(change.type == "added"){
                    let messageObject = {
                        sender : {
                            name : change.doc.data().name,
                            uid : change.doc.data().uid
                        },
                        content : change.doc.data().content,
                        timestamp : change.doc.data().timestamp
                    }
                    var addMessageBool = true
                    this.messages.forEach(iteratedMessage=>{
                        if (iteratedMessage.timestamp == messageObject.timestamp) addMessageBool = false
                    })
                    if(addMessageBool) this.messages.push(messageObject)
                    // newMessages.push(messageObject)
                }
            })
            // this.messages = newMessages
        })
    }
}
</script>

<style>
    .messages {
        padding-left : 10px;
        overflow: auto;
        list-style-type: none;
    }
    @media screen and (max-width: 769px){
        .messages {
            max-height: calc(100vh - 180px)
        }
    }
    @media screen and (min-width: 769px){
        .messages {
            max-height: calc(100vh - 240px)
        }
    }
    .message-sender-avatar{
        margin-top : -5px;
    }
    .message-sender{
        margin-top : 5px !important;
        font-size: 1.25em;
        color : #1565C0;
    }
    .message-content{
        padding-left : 33px;
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
