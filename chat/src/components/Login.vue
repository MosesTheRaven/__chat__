<template>
  <v-container fill-height >
    <v-layout align-center justify-center >
      <v-flex xs12 sm6 md6 class="text-xs-center"  >
        <v-card class="mx-auto" max-width="500" style="padding : 20px; box-shadow : 0px 4px 50px -10px #1E88E5 !important; border-radius : 8px;">
          <v-card-title class="title font-weight-regular justify-center">
            <span class="headline font-weight-bold blue-grey--text text--darken-3">WorkChat</span>
          </v-card-title>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
                <v-text-field
                  label="Email"
                  value="john@vuetifyjs.com"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  This is the email you will use to login to your Vuetify account
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-text-field
                  label="Password"
                  type="password"
                ></v-text-field>
                <v-text-field
                  label="Confirm Password"
                  type="password"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  Please enter a password for your account
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <div class="pa-3 text-xs-center">
                <v-img
                  class="mb-3"
                  contain
                  height="128"
                  src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                ></v-img>
                <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
                <span class="caption grey--text">Thanks for signing up!</span>
              </div>
            </v-window-item>
          </v-window>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              :disabled="step === 1"
              flat
              @click="step--"
            >
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="step === 3"
              color="primary"
              depressed
              @click="step++"
            >
              Next
            </v-btn>
          </v-card-actions>
        </v-card>
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
        currentTitle () {
        switch (this.step) {
          case 1: return 'Sign-up'
          case 2: return 'Create a password'
          default: return 'Account created'
        }
      }
  },
  data: () => ({
      step : 1,
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
      this.setNewNotification
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
