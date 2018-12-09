<template>
    <v-navigation-drawer dark class="blue-grey darken-2"  clipped app v-model="opened">
        <v-list dense>
            <!-- <v-list-group value="true" class="navigation-drawer-components"> -->
                <UserInfo/>
                <Conversations/>
                <!-- <Channels/> -->
                <Projects/>
                
            <!-- </v-list-group> -->
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import Conversations from './navigation/navigation-components/Conversations'
import UserInfo from './navigation/navigation-components/UserInfo'
import Channels from './navigation/navigation-components/Channels'
import Projects from './navigation/navigation-components/Projects'

export default {
    name : 'NavigationDrawer',
    components : {
        UserInfo,
        Conversations,
        Channels,
        Projects
    },

    watch : {
        opened : function(){
            if(!this.opened) this.$emit('closed')
        }
    },
    props : ['opened']
}
</script>
