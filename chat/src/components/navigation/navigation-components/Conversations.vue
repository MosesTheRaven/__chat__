<template>
    <v-list-group class="secondary" value="true">
        <v-list-tile slot="activator">
            <v-list-tile>
                <v-list-tile-title>
                    <span class="title">
                        Conversations
                    </span>
                </v-list-tile-title>
            </v-list-tile>
        </v-list-tile>
        <v-list-tile v-for="(conversation, i) in getConversations" :key="i" @click="changeConversation(conversation)">
            <v-list-tile-action>
                <v-avatar>
                    <v-icon dark>message</v-icon>
                </v-avatar>
            </v-list-tile-action>
            <v-list-tile-title v-text="conversation.name" ></v-list-tile-title>
        </v-list-tile>
        <NewConversationDialog/>
    </v-list-group>
</template>
<script>
import NewConversationDialog from './NewConversationDialog'
import { mapGetters, mapActions } from 'vuex'

export default {
    name : 'Conversations',
    components : {
        NewConversationDialog
    },
    data(){
        return {
            conversations : ['Conversations loading']
        }
    },
    computed: {
        ...mapGetters(['getConversations', 'getUserData'])
    },
    methods: {
        ...mapActions(['retrieveConversations', 'setNewCurrentConversation']),

        changeConversation(conversation){
            this.setNewCurrentConversation(conversation)
        }
        
    },
    created(){
        this.retrieveConversations(this.getUserData.uid)
    }
}
</script>
