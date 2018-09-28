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
        <v-btn @click="login">Login</v-btn>
      </v-layout>
    </v-flex>
  </v-form>
</template>

<script>
import * as firebase from 'firebase'

export default {
name : 'Login',
data: () => ({
    show : false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
    },
    loginForm : {},
    name: '',
    password: '',
}),
methods:{
    login : ()=>{
        //nothing happens yet
    }
}
}
</script>