<template>
    <v-list-tile>
        <v-list-tile-avatar>
            <v-avatar>
                <i class="fas fa-user"></i>
            </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-title class="username-heading">
            {{ username }}
        </v-list-tile-title>
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
    }
}
</script>
<style>
    .username-heading{
        font-size : 1.2em;
        font-weight: 700;
    }
</style>
