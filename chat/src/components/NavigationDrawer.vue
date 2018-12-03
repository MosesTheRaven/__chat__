<template>
    <div>
        <v-navigation-drawer fixed v-model="opened" app>
            <v-list >
                <v-list-group value="true" class="navigation-drawer-components">
                    <UserInfo/>
                    <Conversations/>
                    <Channels/>
                    <Projects/>
                </v-list-group>
            </v-list>
            
        </v-navigation-drawer>
    </div>
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
    data() {
        return {
            // - use this to open/close the temporary drawer
            left : false,
            openSettings : false,
            content : '0'
            
        }
    },
    props : ['opened']
}
</script>
