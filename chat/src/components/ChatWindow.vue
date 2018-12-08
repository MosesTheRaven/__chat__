<template>
    <ul class="messages" v-chat-scroll>
        <p v-if="messages.length == 0">Conversation is loading</p>
        <li v-else v-for="(message, index) in messages" :key="index">
            <p>
                <strong>
                    {{message.sender.name}}:
                </strong>
                {{message.content}}
            </p>
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
        fetchMessages(){

        }
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
                        this.messages.push(messageObject)
                        // newMessages.push(messageObject)
                    }
                })
                // this.messages = newMessages
            })
        }
    },
    created(){
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
                        this.messages.push(messageObject)
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
        max-height: 400px;
        overflow: auto;
        list-style-type: none;
    }
    .messages strong{
        font-size: 1.1em;
        color : whitesmoke;
    }

    .messages::-webkit-scrollbar{
        width : 3px;
    }
    .messages::-webkit-scrollbar-track{
        background : white;
    }   
    .messages::-webkit-scrollbar-thumb{
        background : gray;
    } 
</style>
