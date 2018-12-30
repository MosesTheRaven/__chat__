<template>
  <v-container fill-height class="kek">
    <v-layout align-center justify-center>
      <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    
      <v-flex xs12 sm6 md6 class="text-xs-center"  >
        <v-card class="mx-auto" max-width="500" style="padding : 20px; box-shadow : 0px 4px 50px -10px #1E88E5 !important; border-radius : 8px;">
          <v-card-title class="title font-weight-regular justify-center">
            <span class="headline font-weight-bold blue-grey--text text--darken-3">WorkChat</span>
          </v-card-title>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
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
                    
              </v-form>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-text-field
                  label="Nickname"
                  type="text"
                  v-model='registerName'
                  :rules="[rules.required]"
                    
                ></v-text-field>
                <v-text-field
                  v-model='registerPassword'
                  label="Password"
                  type="password"
                  :rules="[rules.required, rules.min]"
                ></v-text-field>
                <v-text-field
                  v-model="repeatPassword"
                  label="Confirm Password"
                  type="password"
                  :rules="[rules.required, rules.min]"
                ></v-text-field>
                <span :class="wrongUserData ? 'caption red--text' : 'caption grey--text'">
                  {{captionText}}
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <div class="pa-3 text-xs-center justify-center">
                <h3 class="headline font-weight-light mb-4 blue--text text--darken-2">Pick your avatar</h3>
                <p v-for="i in 10" :key="i">
                  <span v-on:click="processAvatar(i*10+j)" 
                        :class="i*10+j == selectedAvatar ? 'blue--text avatar-picker orange-border' : 'avatar-picker '" 
                        v-for="j in 10" 
                        :key="j" 
                        style="width : 100%" >
                    <i :class="'far ' + avatars[i*10+j]" style="width: 10%; font-size: 20px"></i>
                  </span>
                </p>
                <p class="headline" >You will look like this: </p> 
                <v-chip class="headline" style="padding : 5px"  color="primary" text-color="white">
                  <v-avatar>
                    <i :class="'far ' + avatars[selectedAvatar]"></i>
                  </v-avatar>
                    {{registerName}}
                </v-chip>
              </div>
            </v-window-item>
          </v-window>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer v-if="step ==2 || step==3"></v-spacer>
            <v-btn flat :disabled="hideRegister" color="secondary" @click="stepper()">{{registerButtonText}}</v-btn>
            <v-spacer v-if="step==1"></v-spacer>
            <v-btn v-if="step==1" :disabled="name == '' || password == ''" type="submit" form="loginForm" @click="initiateLogin" color="secondary">Login</v-btn>
            
            
          </v-card-actions>
        </v-card>
        
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
      hideRegister : false,
      registerButtonText : 'Sign up',
      registerPassword : '',
      repeatPassword : '',
      registerName : '',
      selectedAvatar : 13,
      avatars : [
        'fa-user',
        'fa-user-tie',
        'fa-user-ninja',
        'fa-user-secret',
        'fa-user-md',
        'fa-user-injured',
        'fa-user-astronaut',
        'fa-user-graduate',
        'fa-user-crown',
        'fa-user-alt',
        'fa-alicorn',
        'fa-bat',
        'fa-unicorn',
        'fa-cat',
        'fa-cow',
        'fa-dog',
        'fa-duck',
        'fa-dove',
        'fa-dragon',
        'fa-elephant',
        'fa-pig',
        'fa-pegasus',
        'fa-monkey',
        'fa-horse-head',
        'fa-spider',
        'fa-rabbit-fast',
        'fa-sheep',
        'fa-snake',
        'fa-squirrel',
        'fa-headphones',
        'fa-car',
        'fa-truck-monster',
        'fa-acorn',
        'fa-axe',
        'fa-football-ball',
        'fa-mug-hot',
        'fa-heart',
        'fa-poo',
        'fa-smile',
        'fa-meh',
        'fa-chess-king',
        'fa-chess-queen',
        'fa-bug',
        'fa-paper-plane',
        'fa-palette',
        'fa-paint-brush',
        'fa-mars',
        'fa-venus',
        'fa-jack-o-lantern',
        'fa-hat-witch',
        'fa-hat-wizard',
        'fa-ghost',
        'fa-hockey-mask',
        'fa-scarecrow',
        'fa-bat',
        'fa-skull-crossbones',
        'fa-hand-spock',
        'fa-hand-peace',
        'fa-fist-raised',
        'fa-angel',
        'fa-snowman',
        'fa-gingerbread-man',
        'fa-glass-champagne',
        'fa-bolt',
        'fa-fire',
        'fa-pi',
        'fa-theta',
        'fa-infinity',
        'fa-cannabis',
        'fa-biohazard',
        'fa-radiation',
        'fa-bomb',
        'fa-axe-battle',
        'fa-anchor',
        'fa-dice-d20',
        'fa-fighter-jet',
        'fa-futbol',
        'fa-gamepad',
        'fa-helmet-battle',
        'fa-hat-santa',
        'fa-paw',
        'fa-rocket',
        'fa-sword',
        'fa-snowflake',
        'fa-frosty-head',
        'fa-star',
        'fa-cross',
        'fa-peace',
        'fa-yin-yang',
        'fa-khanda',
        'fa-jedi',
        'fa-hood-cloak',
        'fa-eye-evil',
        'fa-wand',
        'fa-omega',
        'fa-empty-set',
        'fa-lambda',
        'fa-times',
        'fa-badger-honey',
        'fa-sun',
        'fa-otter'
      ],
      captionText : 'Please enter your desired nickname and a password for your account',
      wrongUserData : false,
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
    processAvatar(aid){
      this.selectedAvatar = aid
    },
    stepper(){
      switch (this.step) {
        case 1 : {
          this.step++; 
          this.registerButtonText = 'Next'
          break
        }
        case 2 : {
          if(this.registerName != '' && this.registerPassword != '' && this.registerPassword.length > 7 && this.registerPassword == this.repeatPassword){
            this.step++;
            this.registerButtonText = 'Confirm'
            this.wrongUserData = false
          }
          else {
            this.registerButtonText = 'Sign Up'
            this.captionText = "Wrong user data"
            this.wrongUserData = true;
          }
          break
        }
        case 3 : {
          this.initiateRegistration()
          this.registerButtonText = "Sign Up"
          this.step = 1
          this.hideRegister = true
        } 
      } 
      
    },
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
        name : this.registerName,
        email : this.registerName + "@abc.def", 
        password : this.registerPassword,
        avatar : this.avatars[this.selectedAvatar]
      }
      this.register(registrationData)
    }
  }
}
</script>
<style>
  .avatar-picker:hover {
    color : #E65100
  }
</style>
