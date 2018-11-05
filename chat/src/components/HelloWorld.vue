<template>
  <v-layout>
    <v-flex>
      <v-card>
          <v-card-title primary-title class="justify-center">
              <h3 class="headline mb-0">Welcome to the __chat__</h3>
          </v-card-title>
          <v-card-text>
            <Login v-if="!isLoggedIn"/>
            <Chat v-else/>
          </v-card-text>
      </v-card>
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
