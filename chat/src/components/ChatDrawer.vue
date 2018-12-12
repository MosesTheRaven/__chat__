<template>
    <v-navigation-drawer v-model="rightDrawer" app clipped right>
      <v-toolbar class="py-3">
        <v-toolbar-title>
          Conversation Information
        </v-toolbar-title>
      </v-toolbar>
      <v-list subheader class="pa-1">
        <v-subheader>
          Members
        </v-subheader>
        <v-chip  v-for="(user, i) in getCurrentConversationUsersObject" :key="i" color="primary" text-color="white">
          <v-avatar><v-icon>account_circle</v-icon></v-avatar>  {{ user.name }}
        </v-chip>

      </v-list>
    </v-navigation-drawer>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name : 'ChatDrawer',
    data(){
        return{
            conversationUsers : [],
            rightDrawer : this.$mq !== 'sm' ? null : false
        }
    },
    computed :{
      ...mapGetters(['getCurrentConversationUsersObject'])
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