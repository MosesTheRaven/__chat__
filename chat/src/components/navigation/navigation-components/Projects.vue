<template>
    <v-list-group :class="active" v-model="opened">
        <v-list-tile ripple slot="activator">
            <v-list-tile>
                <v-list-tile-title>
                    <span :class="active ==='primary' ? 'title font-weight-light' : 'title font-weight-medium' ">
                        Projects
                    </span>
                </v-list-tile-title>
            </v-list-tile>
        </v-list-tile>
        <v-list-tile 
            :class="getCurrentConversation == conversation.name ? 'secondary' : 'primary darken-2'" 
            v-for="(conversation, i) in getProjects" :key="i" 
            ripple 
            @click="changeConversation(conversation)">
            <v-list-tile-action>
                <v-avatar>
                    <v-icon dark>message</v-icon>
                </v-avatar>
            </v-list-tile-action>
            <v-list-tile-title 
                :class="getCurrentConversation == conversation.name ? 'font-weight-bold' : 'font-weight-light'" 
                v-text="conversation.name">
            </v-list-tile-title>
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
        ...mapGetters(['getProjects', 'getCurrentConversation'])
    },
    methods : {
         ...mapActions(['setNewCurrentConversation']),

         changeConversation(conversation){
            this.setNewCurrentConversation(conversation)
        },

    },
    watch : {
        opened : function(){
            if(this.opened) this.active = 'primary darken-2'
            else this.active = 'primary' 
        }
    },
}
</script>
