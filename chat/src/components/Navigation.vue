<template>
    <div v-if="isLoggedIn">
        <Toolbar @clicked="openRightDrawer"/>
        <NavigationDrawer :opened="openedRightDrawer"/>
    </div>    
</template>

<script>
import Toolbar from './Toolbar'
import NavigationDrawer from './NavigationDrawer'
import { mapGetters } from 'vuex'

export default {
    name : 'Navigation',
    components: {
        Toolbar,
        NavigationDrawer    
    },
    methods : {
        openRightDrawer(){
            this.openedRightDrawer = !this.openedRightDrawer
        }
    },
    computed : {
        ...mapGetters(['isLoggedIn']),
    },
    data() {
        return {
            openedRightDrawer : false,
        }
    }
}
</script>

