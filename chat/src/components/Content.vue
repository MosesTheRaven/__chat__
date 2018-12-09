<template>
  <v-content>
    <Login v-if="!isLoggedIn"/>
    <Chat v-else/>
  </v-content>
</template>

<script>
import Login from './Login'
import Chat from './Chat'
import { mapGetters, mapActions } from 'vuex'
import * as firebase from 'firebase'

export default {
  name: 'Content',
  computed : {
        ...mapGetters(['isLoggedIn', 'getUserData']),
  },
  components: {
    Login,
    Chat
  },
  created(){
    // this is the place to work on logged in users


    // firebase.auth().onAuthStateChanged((user) => {
    //   if(user){
    //     this.returnedUserLogin(user)
    //   }
    //   else{
    //   }
    // })
  },
  methods : {
    ...mapActions(['logout', 'returnedUserLogin'])
  }
}
</script>

<style>
</style>
