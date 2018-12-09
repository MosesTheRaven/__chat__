<template>
  <v-list-tile class="font-italic" @click="toggleDialog">
    <v-list-tile-action>
      <v-avatar>
        <i class="fas fa-plus"></i>
      </v-avatar>
    </v-list-tile-action>
    <v-list-tile-title v-text="buttonString"></v-list-tile-title>
      <v-dialog v-model="dialog" persistent max-width="600px">
       <v-card light>
        <v-card-title>
          <span class="headline">Start new conversation</span>
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
            <v-form>
              <v-layout row wrap>
                <v-flex class="checkbox-wrapper" xs12 sm4 md4 v-for="(user,index) in getUsers" :key="index">
                  <v-checkbox color="secondary darken-2" :label="user.name" v-model="conversation.selectedUsers" :value="user.uid"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="blue darken-2" flat @click="dialog = false">Close</v-btn>
            <v-btn class="white--text" color="secondary darken-2"  @click="initiateNewConversationCreation">Save</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </v-list-tile>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name : 'NewConversationDialog',
    data: () => ({
        buttonString : 'Start New',
        dialog: false,
        users: [],
        conversation: {
          name : "",
          selectedUsers : []
        },
        selectedUsers : [],
        // loader : false
    }),
    computed : {
        ...mapGetters(['getUsers'])
    },
    methods : {
        ...mapActions(['retrieveUsers', 'createNewConversation']),

        initiateNewConversationCreation(){

          if(this.conversation.name != "" && this.conversation.selectedUsers.length > 0){
            this.createNewConversation(this.conversation)
            this.users = []
            this.conversation = {}
            this.dialog = false  
          }
          else {
            // notify the user to check his conversation
          }
          
        },
        toggleDialog(){
          this.dialog = !this.dialog
        }
    },
    created() {
        this.retrieveUsers()
    },
    


}
</script>
<style>
  .checkbox-wrapper .v-input__slot{
    margin-bottom : 0px !important
  }
  @media screen and (max-width: 769px){
    .checkbox-wrapper .v-input{
      margin-top : 0px !important;
    }

  }
</style>
