<template>
  <v-content class="wrap-content">
      <vue-particles v-if="!isLoggedIn" class="particles"
      color="#1e88e5"
      :particleOpacity="0.7"
      :particlesNumber="300"
      shapeType="circle"
      :particleSize="4"
      linesColor="#1e88e5"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="100"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
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
.particles{
  position: absolute;
  top : 0;
  left: 0;
  width : 100%;
  height: 100%;
}
</style>
