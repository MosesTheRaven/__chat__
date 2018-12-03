import FirebaseAPI from '../../firebase/firebaseAPI'

const state = {
  users : {}
}
  
  const getters = {
    getUsers : (state) =>{
      return state.users
    }
  }
  
  const mutations = {
    setUsers : (state, newUsers) => {
      state.users = newUsers
      console.log(newUsers)
    }
  }
  
  const actions = {
    sendMessage : ({commit}, messageObject)=>{
      return FirebaseAPI.firestore.sendMessage(messageObject)
    },
    retrieveUsers : ({commit}) => {
      FirebaseAPI.retrieveUsers().on('value', (userDataSnapshot)=>{
        commit('setUsers', userDataSnapshot.val())
      })
    }
  }
  
  
  export default {
    state,
    getters,
    mutations,
    actions
  }