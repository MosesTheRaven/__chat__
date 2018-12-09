<template>
    <div>
        <v-list-tile avatar class="py-3" style="box-shadow : 0px 4px 50px -10px #1E88E5 !important;">
            <v-list-tile-avatar>
                <v-avatar class="secondary">
                    <v-icon class="white--text ">forum</v-icon>
                </v-avatar>
            </v-list-tile-avatar>
                <v-flex column>
                    <span class="headline font-weight-bold">conversation_name</span>
                    <span >x/y online</span>
                </v-flex>
            <v-list-tile-title class="title font-weight-black">
            </v-list-tile-title>
        </v-list-tile>  
    </div>
</template>
<script>
export default {
    name : 'ChatHeading',

}
</script>

