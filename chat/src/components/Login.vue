<template>
  <v-container fill-height >
    <v-layout align-center justify-center >
      <v-flex xs12 sm6 md6 class="text-xs-center"  style="padding : 20px; box-shadow : 0px 4px 50px -10px #1E88E5 !important; border-radius : 8px;">
        <p class="headline font-weight-bold blue-grey--text text--darken-3">WorkChat</p>
        <v-form id="loginForm" @submit.prevent="initiateLogin">
          <v-text-field
            v-model="name"
            label="Nickname"
            required
          ></v-text-field>
          <v-text-field
              v-model="password"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              @click:append="show = !show"
          ></v-text-field>
              <v-btn @click="initiateRegistration">Register</v-btn>
              <v-btn type="submit" form="loginForm" @click="initiateLogin">Login</v-btn>
        </v-form>
      </v-flex>        
    </v-layout>
</v-container>
</template>

<script>
import * as FirebaseAPI from 'firebase'
import { mapActions, mapGetters } from 'vuex'

export default {
  name : 'Login',
  computed : {
        ...mapGetters(['isLoggedIn', 'getCrashReport']),
  },
  data: () => ({
      show : false,
      rules: {
        required: name => !!name || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
      name: '',
      password: '',
  }),
  methods:{
    ...mapActions(['login', 'register']),
        
    initiateLogin(){
      var loginData = {
        email : this.name+"@abc.def", 
        password : this.password
      }
      this.login(loginData)
    } ,
    initiateRegistration(){
      var registrationData = {
        name : this.name,
        email : this.name+"@abc.def", 
        password : this.password
      }
      this.register(registrationData)
    }
  }
}
</script>
<style>
</style>
