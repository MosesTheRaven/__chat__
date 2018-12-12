<template>
  <v-content>
    <Login v-if="!isLoggedIn"/>
    <Chat v-else @emitToContent="emitToApp"/>
  </v-content>
</template>

<script>
import Login from './Login'
import Chat from './Chat'
import { mapGetters, mapActions } from 'vuex'
import FirebaseAPI from '../firebase/firebaseAPI'

export default {
  name: 'Content',
  computed : {
        ...mapGetters(['isLoggedIn', 'getUserData']),
  },
  components: {
    Login,
    Chat
  },
  methods : {
    ...mapActions(['logout', 'returnedUserLogin', 'setNewCurrentConversation']),
    emitToApp(){
      this.$emit('emitToApp')
    }
  },
  watch : {
    isLoggedIn: function(){
      if(this.isLoggedIn){
      FirebaseAPI.retrieveConversationInfo('-LTV53d2KK36x8ZrDwIk')
        .on('value', (conversationInfo)=>{
          this.setNewCurrentConversation(conversationInfo.val())
        })
      }
    }
  }
}
</script>

<style>
</style>
