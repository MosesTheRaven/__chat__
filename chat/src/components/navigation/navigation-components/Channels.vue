<template>
    <v-list-group value="true" no-action sub-group>
        <v-list-tile slot="activator">
            <v-list-tile>
                <v-list-tile-title>
                    <span class="title">
                            Channels
                    </span>
                </v-list-tile-title>
            </v-list-tile>
        </v-list-tile>
        <v-list-tile v-for="(channel, i) in channels" :key="i" @click="">
            <v-list-tile-title v-text="channel"></v-list-tile-title>
        </v-list-tile>
    </v-list-group>
</template>
<script>
export default {
    name : 'Channels',
    data(){
        return {
            channels : ['marketing department', 'managers', 'development team']
        }
    }
    
}
</script>
