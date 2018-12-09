<template>
  <v-app>
    <Navigation/>
    <Content/>
    <v-footer fixed app >
      <v-layout justify-center>
        <span class="text-xs-center">&copy; 2018 <br>In memoriam <i><b>Adam</b></i></span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import Content from './components/Content'
import Chat from './components/Chat'
import Navigation from './components/Navigation'
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  components: {
    Content,
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
  created(){
    
  }
}
</script>
