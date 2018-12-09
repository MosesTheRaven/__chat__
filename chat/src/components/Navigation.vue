<template>
    <div v-if="isLoggedIn">
        <Toolbar @clicked="openRightDrawer"/>
        <NavigationDrawer :opened="openedRightDrawer" @closed="setClosed"/>
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
        },
        setClosed(){
            this.openedRightDrawer = false
        }
    },
    computed : {
        ...mapGetters(['isLoggedIn']),
    },
    data() {
        return {
            openedRightDrawer : null,
        }
    },
    created() {
        this.openedRightDrawer =  this.$mq === 'sm' ? null : true
       
    },
}
</script>