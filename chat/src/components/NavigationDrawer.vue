<template>
    <div>
        <v-navigation-drawer fixed v-model="opened" app>
            <v-list class="navigation-drawer-components">
                <Conversations/>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import Conversations from './navigation/navigation-components/Conversations'

export default {
    name : 'NavigationDrawer',
    components : {
        Conversations
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
<style>
    .navigation-drawer-components {
        font-weight: 500;


        
        font-size : 1.2em;
    }
</style>
