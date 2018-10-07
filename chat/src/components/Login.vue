<template>
  <v-form v-model="loginForm">
    <v-text-field
      v-model="name"
      label="Name"
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
    <v-flex>
      <v-layout justify-center>
        <v-btn @click="initiateRegistration">Register</v-btn>
        <v-btn @click="initiateLogin">Login</v-btn>
      </v-layout>
    </v-flex>
  </v-form>
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
      loginForm : {},
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
        email : this.name+"@abc.def", 
        password : this.password
      }
      this.register(registrationData)
    }
  }
}
</script>