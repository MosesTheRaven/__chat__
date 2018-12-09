<template>
    <v-snackbar v-model="snackbar">
      {{ getNotification }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name : 'Notification',
    data(){
        return {
            text: "",
            snackbar : false
        }
    },
    computed : {
        ...mapGetters(['getNotification'])
    },
    watch : {
        getNotification: function(){
            this.snackbar = true
        }
    }
}
</script>
