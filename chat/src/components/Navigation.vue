<template>
    <div v-if="isLoggedIn">
        <Toolbar 
            @clickedLeft="toggleLeftDrawer"
            @clickedRight="toggleRightDrawer"
        />
        <NavigationDrawer  
            :leftDrawerVar="leftDrawerVar" @setLeftDrawerVar="newValue => leftDrawerVar=newValue"
        />
        <ChatDrawer
            v-if="this.$mq == 'sm'"
            :rightDrawerVar="rightDrawerVar" @setRightDrawerVar="newValue => rightDrawerVar=newValue"
        />
    </div>    
</template>

<script>
import Toolbar from './Toolbar'
import NavigationDrawer from './NavigationDrawer'
import ChatDrawer from './ChatDrawer'
import { mapGetters } from 'vuex'

export default {
    name : 'Navigation',
    components: {
        Toolbar,
        NavigationDrawer,
        ChatDrawer    
    },
    computed : {
        ...mapGetters(['isLoggedIn']),
    },
    data() {
        return {
            leftDrawerVar : this.$mq !== 'sm' ? null : false,
            rightDrawerVar : this.$mq !== 'sm' ? null : false
            
        }
    },
    watch : {

    },
    methods : {
        toggleLeftDrawer(){
            this.leftDrawerVar = !this.leftDrawerVar
        },
        toggleRightDrawer(){
            this.rightDrawerVar = !this.rightDrawerVar
        }
    }
}
</script>