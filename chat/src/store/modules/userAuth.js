import FirebaseAPI from '../../firebase/firebaseAPI'
import VueLocalStorage from 'vue-localstorage'
import notifaction from 'vuex'

const state = {
  authState : false,
  userData : {},
  crashReport : "",
  
  notificationText : ""

}

const getters = {
  isLoggedIn : (state) =>{
    return state.authState
  },
  getUserData : (state) =>{
    return state.userData
  },
  getCrashReport : (state) =>{
    return state.crashReport
  },
  getNotification : (state)=>{
    return state.notificationText
  }
}

const mutations = {
  setAuthState : (state, bool) => {
    state.authState = bool
  },
  setUserData : (state, newUserData) => {
    state.userData = newUserData
  },
  setCrashReport : (state, newCrashReport) => {
    state.crashReport = newCrashReport
  },
  setNotificationText : (state, newNotificationText) => {
    state.notificationText = newNotificationText
  }
}

const actions = {
  sendNotification : ({ commit }, newNotificationText) => {
    commit('setNotificationText', newNotificationText)
  },
  updateUserData : ({ commit }, newUserData) => {
    commit('setUserData', newUserData)
  },
  logout : ({ commit }) => {
    commit('setAuthState', false)
  },
  login : ({ commit, dispatch }, loginData) => {
    FirebaseAPI.login(loginData.email, loginData.password, (userData)=>{
        if(userData.type == "success"){
            var retrievedUserData = {
              'name' : userData.data.name, 
              'uid' : userData.data.uid,
              'avatar' : userData.data.avatar
            } 
            commit('setUserData', retrievedUserData)
            commit('setAuthState', true)
            localStorage.setItem('user', JSON.stringify(retrievedUserData))

            dispatch('sendNotification', 'Sucessfully logged in')
        }
        else {
            commit('setCrashReport', userData.data)
            dispatch('sendNotification', 'There was a problem with your login')

            // rootState.notification.updateNotificationText('Incorrect nickname or password')

        }
    })
  },
  register : ({dispatch}, registrationData)=>{
    FirebaseAPI.createUser(registrationData, (retData)=>{
      dispatch('sendNotification', retData.message)
    })
  },
}


export default {
  state,
  getters,
  mutations,
  actions
}