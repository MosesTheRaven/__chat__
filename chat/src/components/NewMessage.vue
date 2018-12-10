<template>
    <v-flex>
        <v-form @submit.prevent="initiateMessageSend">
            <fieldset>
                <v-text-field label="type message here.." v-model="message"/>
            </fieldset>
            <fieldset>
                <p>Actions</p>
                <v-btn ripple>
                    <i class="fas fa-plus"></i>
                </v-btn>
                <v-btn ripple>
                    <i class="fas fa-code"></i>
                </v-btn>
                <v-menu offset-y>
                    <v-btn slot="activator" color="primary"                    >
                        <i class="far fa-meh-blank"></i>
                    </v-btn>
                    <v-list>
                        <v-list-tile v-for="(item, index) in items" :key="index" @click="">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                    </v-menu>
            </fieldset>
        </v-form>   
    </v-flex>
    
</template>
<script>
import * as FirebaseAPI from 'firebase'
import { mapActions, mapGetters } from 'vuex'

export default {
    name : 'NewMessage',
    data(){
        return{
            message : '',
            items: [
                { title: ':)' },
                { title: ':(' },
                { title: ':/' },
                { title: ':3' }
            ]
        }
    },
    computed : {
        ...mapGetters(['getUserData']),
    },
    methods: {
        ...mapActions(['sendMessage']),
    
        initiateMessageSend() {
            if(this.message != ""){
                this.sendMessage({
                content : this.message,
                sender : {
                    name : this.getUserData.name,
                    uid : this.getUserData.uid 
                    }
                })
                this.message = "" 
            }
        }
    }

}
</script>

