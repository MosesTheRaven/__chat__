<template>
        <v-list-group value="true" no-action sub-group>
            <v-list-tile slot="activator">
                <v-list-tile>
                    <v-list-tile-title>
                        <span class="title">
                            Conversations
                        </span>
                    </v-list-tile-title>
                </v-list-tile>
            </v-list-tile>
            <v-list-tile v-for="(conversation, i) in conversations" :key="i" @click="">
                <v-list-tile-title v-text="conversation"></v-list-tile-title>
            </v-list-tile>
        </v-list-group>
</template>
<script>
export default {
    name : 'Conversations',
    data(){
        return {
            conversations : ['matija', 'simone', 'karthik']
        }
    }
}
</script>
