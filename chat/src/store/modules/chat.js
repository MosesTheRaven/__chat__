import FirebaseAPI from '../../firebase/firebaseAPI'
import userAuth from '../modules/userAuth'

const state = {
  users : {},
  conversations : [],
  currentConversation : 'Global chatroom',
  currentConversationUsers : 'all'
}
  
  const getters = {
    getUsers : (state) => {
      return state.users
    },
    getConversations : (state) => {
      return state.conversations
    },
    getCurrentConversation : () => {
      return state.currentConversation
    },
    getCurrentConversationUsers : () => {
      return state.currentConversationUsers
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
    },
    setCurrentConversation : (state, newCurrentConversation) => {
      state.currentConversation = newCurrentConversation
    },
    setCurrentConversationUsers : (state, newCurrentConversationUsers) => {
      state.currentConversationUsers = newCurrentConversationUsers
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
          if(conversationDataSnapshot.val()) commit('addConversation', conversationInfoSnapshot.val())
        })
        // commit('setConversations', conversationsDataSnapshot.val())
      })
    },
    createNewConversation : ({commit}, newConversation)=>{
      return FirebaseAPI.createNewConversation(newConversation)
    },
    setNewCurrentConversation: ({commit}, newCurrentConversation)=>{
      commit('setCurrentConversation', newCurrentConversation.name)
      commit('setCurrentConversationUsers', newCurrentConversation.selectedUsers.length)
      
    }
  }
  
  
  export default {
    state,
    getters,
    mutations,
    actions
  }