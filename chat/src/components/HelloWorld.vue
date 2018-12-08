<template>
  <v-layout>
    <v-flex>
      <Login v-if="!isLoggedIn"/>
      <Chat v-else/>
    </v-flex>
  </v-layout>
</template>

<script>
import Login from './Login'
import Chat from './Chat'
import { mapGetters } from 'vuex'

export default {
  name: 'HelloWorld',
  computed : {
        ...mapGetters(['isLoggedIn']),
  },
  components: {
    Login,
    Chat
  },
}
</script>

<style>
</style>
