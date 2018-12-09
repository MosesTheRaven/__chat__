<template>
    <v-layout column>
        <ChatHeading/>
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
      
  }
}
</script>