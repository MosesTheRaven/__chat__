import FirebaseAPI from '../../firebase/firebaseAPI'
import userAuth from '../modules/userAuth'

const state = {
  users : {},
  conversations : [],
  projects : [],
  currentConversation : '', // name string
  currentConversationId: '',
  // currentConversationUsers : '',
  projectConversation : null, // t/f 
  currentConversationUsersObject : [], // conversation users
  currentConversationFiles : {}
}
  
  const getters = {
    getUsers : (state) => {
      return state.users
    },
    getConversations : (state) => {
      return state.conversations
    },
    getProjects : (state) => {
      return state.projects
    },
    getCurrentConversation : () => {
      return state.currentConversation
    },
    // getCurrentConversationUsers : () => {
    //   return state.currentConversationUsers
    // },
    getCurrentProjectConversation : () => {
      return state.projectConversation
    },
    getCurrentConversationUsersObject : () => {
      return state.currentConversationUsersObject
    },
    getCurrentConversationId : ()=>{
      return state.currentConversationId
    },
    getCurrentConversationFiles : ()=>{
      return state.currentConversationFiles
    }
  }
  
  const mutations = {
    setUsers : (state, newUsers) => {
      state.users = newUsers
    },
    addConversation : (state, newConversation) => {
      let conversations = state.conversations
      let projects = state.projects

      if(newConversation.project) projects.push(newConversation)
      else conversations.push(newConversation)

      state.projects = projects
      state.conversations = conversations
    },
    setCurrentConversation : (state, newCurrentConversation) => {
      state.currentConversation = newCurrentConversation
    },
    setCurrentConversationUsers : (state, newCurrentConversationUsers) => {
      state.currentConversationUsers = newCurrentConversationUsers
    },
    setCurrentProjectConversation : (state, newCurrentProjectConversation) => {
      state.projectConversation = newCurrentProjectConversation
    },
    setCurrentConversationId : (state, newConversationId) =>{
      state.currentConversationId = newConversationId
    },
    addUserToCurrentConversation : (state, newUser) => {
      state.currentConversationUsersObject.push(newUser)
    },
    resetCurrentConversationUsers : (state) => {
      state.currentConversationUsersObject.length = 0
    },
    setCurrentConversationFiles : (state, newFiles) => {
      state.currentConversationFiles = newFiles
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
    retrieveUser : ({commit}, newUser) => {
      FirebaseAPI.retrieveUser(newUser, (newUserObject)=>{commit('addUserToCurrentConversation', newUserObject)})
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
    setNewCurrentConversation: ({dispatch, commit}, newCurrentConversation)=>{
      commit('setCurrentConversationId', newCurrentConversation.cid)
      commit('setCurrentConversationFiles', newCurrentConversation.files)
      commit('resetCurrentConversationUsers')
      commit('setCurrentConversation', newCurrentConversation.name)
      Object.entries(newCurrentConversation.selectedUsers).forEach(([key, value]) => dispatch('retrieveUser', value))
      commit('setCurrentConversationUsers', newCurrentConversation.selectedUsers.length)
      commit('setCurrentProjectConversation', newCurrentConversation.project)
    },
    registerFile : ({commit}, fileObject) => {
      FirebaseAPI.registerFile(fileObject.cid)
      .push(fileObject.messageObject)
    }
  }
  
  
  export default {
    state,
    getters,
    mutations,
    actions
  }