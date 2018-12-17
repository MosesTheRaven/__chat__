<template>
    <v-toolbar class="py-3 primary">
        <v-toolbar-side-icon class="headline">
            <i :class="'far ' + avatar"></i>
        </v-toolbar-side-icon>
        <v-toolbar-title class="px-3">{{ username }}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <!-- <v-list-tile avatar class="py-3 primary">
        <v-list-tile-avatar>
            <v-avatar class="white">
                <v-icon class="blue--text text--darken-3">account_circle</v-icon>
            </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-title class="title font-weight-black">
            {{ username }}
        </v-list-tile-title>
        <v-list-tile-content ripple class="px-2">
            <v-icon>settings</v-icon>
        </v-list-tile-content>
    </v-list-tile>     -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name : 'UserInfo',
    computed : {
        ...mapGetters(['getUserData'])
    },
    data(){
        return {
            username : 'Username',
            avatar : 'fa-user'
        }
    },
    created(){
        this.username = this.getUserData.name;
        if(!this.username) this.username = "Username"
        if(this.getUserData.avatar) this.avatar = this.getUserData.avatar
    }
}
</script>
<style>
</style>
