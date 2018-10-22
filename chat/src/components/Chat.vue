<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-title primary-title>
                    <h4>
                        {{message}}{{getUserData.name}}
                    </h4>
                </v-card-title>
                <v-card-text>
                    <ChatWindow/>
                </v-card-text>
                <v-card-actions>
                    <NewMessage/>
                </v-card-actions>    
            </v-card>
        </v-flex>
    </v-layout>
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