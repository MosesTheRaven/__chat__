<template>
    <v-list-tile avatar class="py-3 primary">
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
    </v-list-tile>    
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name : 'UserInfo',
    computed : {
        ...mapGetters(['getUserData'])
    },
    methods(){

    },
    data(){
        return {
            username : 'Username'
        }
    },
    created(){
        this.username = this.getUserData.name;
        if (!this.username) this.username = "Username"
    }
}
</script>
<style>
</style>
