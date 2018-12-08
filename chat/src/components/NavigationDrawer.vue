<template>
    <v-navigation-drawer clipped app v-model="opened">
        <v-list dense>
            <!-- <v-list-group value="true" class="navigation-drawer-components"> -->
                <UserInfo/>
                <Conversations/>
                <NewConversationDialog/>
                <Channels/>
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
import NewConversationDialog from './navigation/navigation-components/NewConversationDialog.vue'


export default {
    name : 'NavigationDrawer',
    components : {
        UserInfo,
        Conversations,
        Channels,
        Projects,
        NewConversationDialog
    },
    props : ['opened']

}
</script>
<style>
</style>
