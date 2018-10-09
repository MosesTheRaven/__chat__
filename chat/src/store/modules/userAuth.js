import FirebaseAPI from '../../firebase/firebaseAPI'
import VueLocalStorage from 'vue-localstorage'

const state = {
  authState : false,
  userData : {},
  crashReport : ""

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
  }
}

const actions = {
  updateUserData : ({ commit }, newUserData) => {
    commit('setUserData', newUserData)
  },
  logout : ({ commit }) => {
    commit('setAuthState', false)
  },
  login : ({ commit }, loginData) => {
    FirebaseAPI.login(loginData.email, loginData.password, (userData)=>{
        if(userData.type == "success"){
            commit('setUserData', userData.data)
            commit('setAuthState', true)
            localStorage
        }
        else {
            commit('setCrashReport', userData.data)
            console.log(userData.error)
        }
    })
  },
  register : ({commit}, registrationData)=>{
    FirebaseAPI.createUser(registrationData, (retData)=>{
        console.log(retData)
    })
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}