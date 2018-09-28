<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-flex xs12 sm6 offset-sm3>
          <v-card-title primary-title>
              <h3 class="headline mb-0">Welcome to the __chat__</h3>
              <div><br>In memoriam <i><b>Adam</b></i></div>
          </v-card-title>
          <Login/>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Login from './Login'

export default {
  name: 'HelloWorld',
  components: {
    Login
  },
  props: {
    msg: String
  }
}
</script>

<style>
</style>
