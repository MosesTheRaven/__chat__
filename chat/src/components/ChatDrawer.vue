<template>
    <v-navigation-drawer v-model="rightDrawer" app clipped right>
      <v-toolbar class="py-3">
        <v-toolbar-title>
          Conversation Information
        </v-toolbar-title>
      </v-toolbar>
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
    data(){
        return{
            rightDrawer : this.$mq !== 'sm' ? null : false
        }
    },
    watch : {
        rightDrawerVar : function(){
            this.rightDrawer = this.rightDrawerVar
        },
        rightDrawer : function(){
            this.$emit('setRightDrawerVar', this.rightDrawer)
        }
    },
    props : ['rightDrawerVar']
  }
</script>