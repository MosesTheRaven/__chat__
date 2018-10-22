<template>
  <v-app dark>
    <v-content>
      <HelloWorld/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <v-layout justify-center>
        <span class="text-xs-center">&copy; 2018 <br>In memoriam <i><b>Adam</b></i> </span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Chat from './components/Chat'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Chat
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
