<template>
    <div v-if="isLoggedIn">
        <Toolbar v-if="this.$mq !== 'sm'" @clicked="openRightDrawer"/>
        <NavigationDrawer :opened="openedRightDrawer || drawer" @closed="setClosed"/>
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
            this.$emit('emitMobileDrawerChange')
        }
    },
    computed : {
        ...mapGetters(['isLoggedIn']),
    },
    data() {
        return {
            openedRightDrawer : null,
            mobileOpenedRightDrawer : null
        }
    },
    created() {
        this.openedRightDrawer =  this.$mq === 'sm' ? null : true
    },
    props : ['drawer']
}
</script>