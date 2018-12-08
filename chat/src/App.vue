<template>
  <v-app>
    <Navigation/>
    <!-- <Navigation :opened="drawer"/>
    <Toolbar @clicked="switchDrawer"/> -->
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex>
            <HelloWorld/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer fixed app>
      <v-layout justify-center>
        <span class="text-xs-center">&copy; 2018 <br>In memoriam <i><b>Adam</b></i> </span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Chat from './components/Chat'
import Navigation from './components/Navigation'
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Chat,
    Navigation,
    Toolbar
},
  data () {
    return {
      drawer : true
    }
  },
  methods : {
    switchDrawer(){
      this.drawer = !this.drawer
    }
  },
}
</script>
