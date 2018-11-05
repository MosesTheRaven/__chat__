<template>
    <div>
        <ChatWindow/>
        <NewMessage/>
    </div>
</template>

<script>

import * as FirebaseAPI from 'firebase'
import { mapGetters } from 'vuex'
import NewMessage from './NewMessage'
import ChatWindow from './ChatWindow'

export default {
  name : 'Chat',
  components : {
      NewMessage,
      ChatWindow
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