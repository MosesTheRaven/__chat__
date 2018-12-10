<template>
    <v-layout column style="height : 100%">
        <!-- <ChatHeading @emitLeftDrawer="emitToContent"/> -->
        <ImprovedChatHeading @emitLeftDrawer="emitToContent" @emitRightDrawer="toggleRightDrawer" />
        <ChatWindow/> 
        <NewMessage/>
        <ChatDrawer :rightDrawer="rightDrawerController"/>
    </v-layout>
</template>

<script>

import * as FirebaseAPI from 'firebase'
import { mapGetters } from 'vuex'
import NewMessage from './NewMessage'
import ChatWindow from './ChatWindow'
import ChatHeading from './ChatHeading'
import ImprovedChatHeading from './ImprovedChatHeading'
import ChatDrawer from './ChatDrawer'

export default {
  name : 'Chat',
  components : {
      NewMessage,
      ChatWindow,
      ChatHeading,
      ImprovedChatHeading,
      ChatDrawer
  },
  computed: {
    ...mapGetters(['getUserData'])
  },
  data: () => ({
      rightDrawerController : null
  }),
  methods:{
      emitToContent(){
          this.$emit('emitToContent')
      },
      toggleRightDrawer(){
          this.rightDrawerController = !this.rightDrawerController
      }
  },
  created(){
    window.scrollTo({
        top: 100,  
        behavior: 'smooth'
    })
  }
}
</script>