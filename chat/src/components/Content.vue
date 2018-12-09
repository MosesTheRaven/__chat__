<template>
  <v-content>
    <Login v-if="!isLoggedIn"/>
    <Chat v-else/>
  </v-content>
</template>

<script>
import Login from './Login'
import Chat from './Chat'
import { mapGetters } from 'vuex'

export default {
  name: 'Content',
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
