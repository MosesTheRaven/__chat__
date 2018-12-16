<template>
    <v-navigation-drawer dark class="blue-grey darken-2"  clipped app v-model="leftDrawer">
        <UserInfo/>
        <v-list dense>
            <!-- <v-list-group value="true" class="navigation-drawer-components"> -->
                <!-- <v-subheader>Conversations</v-subheader> -->
                <Conversations/>
                <v-divider></v-divider>
                <!-- <v-subheader>Conversations</v-subheader> -->
                <Projects/>
                <v-divider></v-divider>
                <v-spacer class="py-3"></v-spacer>
                <!-- <v-tooltip bottom>
                    <v-btn
                        slot="activator"
                        style="margin-top : 16px"
                        small
                        color="secondary"
                        @click="dialog = !dialog"
                    >
                        <v-icon>add</v-icon>
                    </v-btn>    
                    <span>Start a new conversation or project</span>
                </v-tooltip>
                 -->
                <NewConversationDialog/>
            <!-- </v-list-group> -->
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import Conversations from './navigation/navigation-components/Conversations'
import UserInfo from './navigation/navigation-components/UserInfo'
import Channels from './navigation/navigation-components/Channels'
import Projects from './navigation/navigation-components/Projects'
import NewConversationDialog from './navigation/navigation-components/NewConversationDialog'


export default {
    name : 'NavigationDrawer',
    components : {
        UserInfo,
        Conversations,
        Channels,
        Projects,
        NewConversationDialog
    },
    data(){
        return{
            leftDrawer : this.$mq !== 'sm' ? null : false
        }
    },
    watch : {
        leftDrawerVar : function(){
            this.leftDrawer = this.leftDrawerVar
        },
        leftDrawer : function(){
            this.$emit('setLeftDrawerVar', this.leftDrawer)
        }
    },
    props : ['leftDrawerVar']
}
</script>
