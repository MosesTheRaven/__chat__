<template>
    <ul>
        <p v-if="messages.length == 0">nacitavaju sa spravy</p>
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
import { mapActions } from 'vuex'

export default {
    name : 'ChatWindow',
    data(){
        return {
            messages : []
        }
    },
    computed : {
        ...mapActions(['fetchMessages'])
    },
    created(){
        let ref = FirebaseAPI.firestore.getCollection()
        let newMessages = []
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
                    newMessages.push(messageObject)
                }
            })
            this.messages = newMessages
        })
    }
}
</script>
