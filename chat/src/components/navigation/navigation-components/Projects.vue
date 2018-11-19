<template>
    <v-list-group value="true"  no-action sub-group>
        <v-list-tile slot="activator">
            <v-list-tile>
                <v-list-tile-title>
                    <span class="title">
                            Projects
                    </span>
                </v-list-tile-title>
            </v-list-tile>
        </v-list-tile>
        <v-list-tile v-for="(project, i) in projects" :key="i" @click="">
            <v-list-tile-title v-text="project"></v-list-tile-title>
        </v-list-tile>
    </v-list-group>
</template>
<script>
export default {
    name : 'Projects',
    data(){
        return {
            projects : ['project X', 'area 52', 'totally not murder']
        }
    }
}
</script>
