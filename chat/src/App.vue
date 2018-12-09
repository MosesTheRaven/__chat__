<template>
  <v-app>
    <Navigation @emitMobileDrawerChange="drawer=false" :drawer="drawer"/>
    <Content @emitToApp="switchDrawer"/>
    <v-footer v-if="!this.$mq === 'sm'" fixed app >
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
      drawer : false
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
