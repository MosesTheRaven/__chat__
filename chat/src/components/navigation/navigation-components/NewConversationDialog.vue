<template>
  <v-list-tile class="font-italic" @click="toggleDialog">
    <!-- @click="toggleDialog" -->
    <v-list-tile-action>
      <!-- <v-btn fab depressed small color="primary"> -->
        <span class="headline">
          <i class="far fa-comments"></i>
        </span>
      <!-- </v-btn> -->
      <!-- <v-avatar>
        <i class="fas fa-plus"></i>
      </v-avatar> -->
    </v-list-tile-action>
    <v-list-tile-content class="non-italic">
      Start new conversation 
    </v-list-tile-content>
      
      <v-dialog v-model="dialog" persistent max-width="600px">
       <v-card light>
        <v-card-title class="blue darken-2 white--text">
          <span class="headline">Start new conversation</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <span class="title">Conversation information</span>
                <v-text-field v-model="conversation.name" label="Conversation name" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex>
                <v-checkbox  color="secondary darken-2" label="Project conversation" v-model="conversation.project" :value="conversation.project"></v-checkbox>
                <v-text-field  v-model="projectDescription" label="Project description" :disabled="!conversation.project" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-form>
              <v-layout wrap>
                <v-flex fluid style="width : 100%">
                  <span class="title">Conversation members</span>
                </v-flex>
                <v-flex v-if="user.name!='WorkChatAdmin'" class="checkbox-wrapper" xs12 sm4 md4 v-for="(user,index) in getUsers" :key="index">
                  <v-checkbox color="secondary darken-2" :label="user.name" v-model="conversation.selectedUsers" :value="user.uid"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="blue darken-2" flat @click="discardDialog">Close</v-btn>
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
          selectedUsers : [],
          project : false,
        },
        projectDescription : "",
        selectedUsers : [],
        // loader : false
    }),
    computed : {
        ...mapGetters(['getUsers', 'getUserData'])
    },
    methods : {
        ...mapActions(['retrieveUsers', 'createNewConversation', 'sendNotification', ]),

        initiateNewConversationCreation(){

          if(this.conversation.name != "" && this.conversation.selectedUsers.length > 0){
            this.createNewConversation(this.conversation)
            this.users = []
            this.conversation = {}
            this.conversation.selectedUsers = []
            this.conversation.selectedUsers.push(this.getUserData.uid)
            this.dialog = false  
            this.sendNotification('Successfully created a new conversation')
          }
          else {
            this.sendNotification('There was a problem while creating a conversation')
          }
          
        },
        discardDialog(){
            this.users = []
            this.conversation = {}
            this.conversation.selectedUsers = []
            this.conversation.selectedUsers.push(this.getUserData.uid)
            this.dialog = false  
            
        },
        toggleDialog(){
          this.dialog = !this.dialog
        }
    },
    created() {
        this.retrieveUsers()
        this.conversation.selectedUsers.push(this.getUserData.uid)
    },
    


}
</script>
<style>
  .non-italic{
    font-style: normal !important;
    font-size : 14px;
    font-weight : 500 !important;
  }
  .checkbox-wrapper .v-input__slot{
    margin-bottom : 0px !important
  }
  @media screen and (max-width: 769px){
    .checkbox-wrapper .v-input{
      margin-top : 0px !important;
    }

  }
</style>
