import FirebaseAPI from '../../firebase/firebaseAPI'

const state = {
  }
  
  const getters = {

  }
  
  const mutations = {
    
  }
  
  const actions = {
    sendMessage : ({commit}, messageObject)=>{
      return FirebaseAPI.firestore.sendMessage(messageObject)
    },
  }
  
  
  export default {
    state,
    getters,
    mutations,
    actions
  }