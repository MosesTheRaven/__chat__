<template>
    <div>
        <v-navigation-drawer fixed v-model="opened" app>
            <v-list>
                <v-card>
                    <v-card-title>
                        <h1>
                            Conversations
                        </h1>
                    </v-card-title>
                </v-card>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-layout>
                                <v-flex align-content-start justify-start>
                                    <div style="display : flex; flex-direction : row;">
                                        <v-avatar color="grey lighten-4">
                                            <img src="https://image.flaticon.com/icons/svg/747/747376.svg" alt="avatar">
                                        </v-avatar>
                                        <h2>UserName</h2>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-list-tile >
                    <v-list-tile-action>
                        <v-icon @click="openSettings=!openSettings">Settings</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile-content v-if="openSettings">
                        <v-list-tile-action>
                            <v-icon @click="left=!left; content='1'">Settings 1</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-action>
                            <v-icon @click="left=!left; content='2'">Settings 2</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-action>
                            <v-icon @click="left=!left; content='3'">Settings 3</v-icon>
                        </v-list-tile-action>
                        {{content}}
                </v-list-tile-content>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name : 'NavigationDrawer',
    data() {
        return {
            // - use this to open/close the temporary drawer
            left : false,
            openSettings : false,
            content : '0'
            
        }
    },
    props : ['opened']
}
</script>