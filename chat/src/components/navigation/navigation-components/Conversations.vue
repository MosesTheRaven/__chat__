<template>
        <v-list-group value="true" no-action sub-group>
            <v-list-tile slot="activator">
                <v-list-tile>
                    <v-list-tile-title>
                        <span class="title">
                            Conversations
                        </span>
                    </v-list-tile-title>
                </v-list-tile>
            </v-list-tile>
            <v-list-tile v-for="(conversation, i) in getUsers" :key="i" @click="console.log('clicked')">
                <v-list-tile-title v-text="conversation.name"></v-list-tile-title>
            </v-list-tile>
        </v-list-group>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name : 'Conversations',
    data(){
        return {
            conversations : ['Users loading']
        }
    },
    computed: {
        ...mapGetters(['getUsers'])
    },
    methods: {
        ...mapActions(['retrieveUsers'])
    },
    created(){
        this.retrieveUsers()
    }
}
</script>
