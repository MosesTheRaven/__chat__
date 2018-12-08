<template>
     <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New Conversation</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field v-model="conversation.name" label="Conversation name" required></v-text-field>
              </v-flex>
              <v-flex>
              </v-flex>
            </v-layout>
            <v-form v-model="newConversation">
                <v-checkbox v-for="(user,index) in getUsers" :key="index"
                :label="user.name" v-model="conversation.selectedUsers" :value="user.uid"></v-checkbox>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="initiateNewConversationCreation">Save</v-btn>
          <!-- <v-flex v-if="loader">
            <v-progress-circular  indeterminate color="primary"></v-progress-circular>
        </v-flex> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name : 'NewConversationDialog',
    data: () => ({
        dialog: false,
        users: [],
        conversation: {
          name : "",
          selectedUsers : []
        },
        selectedUsers : [],
        newConversation : {}
        // loader : false
    }),
    computed : {
        ...mapGetters(['getUsers'])
    },
    methods : {
        ...mapActions(['retrieveUsers', 'createNewConversation']),

        initiateNewConversationCreation(){
          this.createNewConversation(this.conversation)
          this.users = []
          this.conversation = {}
          this.dialog = false

        }
    },
    created() {
        this.retrieveUsers()
    },
    


}
</script>