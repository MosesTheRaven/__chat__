<template>
    <v-list-group :class="active" v-model="opened">
        <v-list-tile ripple slot="activator">
            <v-list-tile>
                <v-list-tile-title>
                    <span class="title">
                        Projects
                    </span>
                </v-list-tile-title>
            </v-list-tile>
        </v-list-tile>
        <v-list-tile v-for="(conversation, i) in getProjects" :key="i" ripple @click="changeConversation(conversation)">
            <v-list-tile-action>
                <v-avatar>
                    <v-icon dark>message</v-icon>
                </v-avatar>
            </v-list-tile-action>
            <v-list-tile-title v-text="conversation.name" ></v-list-tile-title>
        </v-list-tile>
    </v-list-group>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name : 'Projects',
    data(){
        return {
            opened : false,
            active : 'primary'
        }
    },
    computed: {
        ...mapGetters(['getProjects'])
    },
    methods : {
         ...mapActions(['retrieveConversations', 'setNewCurrentConversation']),

    },
    watch : {
        opened : function(){
            if(this.opened) this.active = 'secondary'
            else this.active = 'primary' 
        }
    },
}
</script>
