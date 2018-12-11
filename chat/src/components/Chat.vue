<template>
    <v-layout column style="height : 100%">
        <!-- <ChatHeading @emitLeftDrawer="emitToContent"/> -->
        <ImprovedChatHeading v-if="this.$mq !== 'sm'" @emitLeftDrawer="emitToContent" @emitRightDrawer="toggleRightDrawer" />
        <ChatWindow/> 
        <NewMessage/>
        <ChatDrawer
            v-if="this.$mq !== 'sm'"
            :rightDrawerVar="rightDrawerVar" @setRightDrawerVar="newValue => rightDrawerVar=newValue"
        />
        
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
      rightDrawerVar : this.$mq == 'sm' ? null : false
  }),
    methods : {
        toggleRightDrawer(){
            this.rightDrawerVar = !this.rightDrawerVar
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