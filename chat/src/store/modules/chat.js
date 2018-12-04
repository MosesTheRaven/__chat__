import FirebaseAPI from '../../firebase/firebaseAPI'
import userAuth from '../modules/userAuth'

const state = {
  users : {},
  conversations : []
}
  
  const getters = {
    getUsers : (state) =>{
      return state.users
    },
    getConversations : (state) =>{
      return state.conversations
    }
  }
  
  const mutations = {
    setUsers : (state, newUsers) => {
      state.users = newUsers
    },
    addConversation : (state, newConversation) => {
      let conversations = state.conversations
      conversations.push(newConversation)
      state.conversations = conversations
      console.log(state.conversations)
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
    },
    retrieveConversations : ({commit}, uid)=>{
      FirebaseAPI.retrieveConversations(uid).on('child_added', (conversationDataSnapshot)=>{
        FirebaseAPI.retrieveConversationInfo(conversationDataSnapshot.key).on('value', (conversationInfoSnapshot)=>{
          commit('addConversation', conversationInfoSnapshot.val())
        })
        // commit('setConversations', conversationsDataSnapshot.val())
      })
    }
  }
  
  
  export default {
    state,
    getters,
    mutations,
    actions
  }