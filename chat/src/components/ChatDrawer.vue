<template>
    <v-navigation-drawer
      v-model="resolveRightDrawer"
      absolute
      temporary
      right
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name : 'ChatDrawer',
    data () {
      return {
        resolveRightDrawer : null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ]
      }
    },
    watch : {
      rightDrawer : function(){
        this.resolveRightDrawer = this.rightDrawer
      }
    },
    props : ['rightDrawer']
  }
</script>