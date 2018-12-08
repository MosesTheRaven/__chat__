import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader


Vue.use(Vuetify, {
    theme: {
        primary: colors.blueGrey.darken2,
        secondary: colors.blue.darken1,
        accent: colors.indigo.darken1,
        error: colors.red.accent4,
        warning: colors.yellow.base,
        info: colors.lightBlue.base,
        success: colors.green.base
    },
    iconfont: 'mdi'
})
