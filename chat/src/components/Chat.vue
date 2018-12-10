<template>
    <v-layout column style="height : 100%">
        <ChatHeading @emitLeftDrawer="emitToContent"/>
        <ChatWindow/> 
        <NewMessage/>
    </v-layout>
</template>

<script>

import * as FirebaseAPI from 'firebase'
import { mapGetters } from 'vuex'
import NewMessage from './NewMessage'
import ChatWindow from './ChatWindow'
import ChatHeading from './ChatHeading'

export default {
  name : 'Chat',
  components : {
      NewMessage,
      ChatWindow,
      ChatHeading
  },
  computed: {
    ...mapGetters(['getUserData'])
  },
  data: () => ({
      message : "Hello, "
  }),
  methods:{
      emitToContent(){
          this.$emit('emitToContent')
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