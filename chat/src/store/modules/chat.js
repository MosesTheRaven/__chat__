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
  currentConversationFiles : [],
  currentConversationProjectDescription : ""
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
    },
    getCurrentConversationProjectDescription : ()=>{
      return state.currentConversationProjectDescription
    }
  }
  
  const mutations = {
    setUsers : (state, newUsers) => {
      state.users = newUsers
    },
    addConversation : (state, newConversation) => {
      let conversations = state.conversations
      let projects = state.projects
      if(newConversation.project){
        var isInProjects = false
        for(var i = 0; i < projects.length; i++){
          if(projects[i].cid == newConversation.cid) {
            isInProjects = true;
            break
          }
        }
        if(!isInProjects) projects.push(newConversation)
      } 
      else {
        var isInConversations = false
        for(var i = 0; i < conversations.length; i++){
          if(conversations[i].cid == newConversation.cid) {
            isInConversations = true;
            break
          }
        }
        if(!isInConversations) conversations.push(newConversation)
    } 

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
      var isInUsers = false
      for(var i = 0; i < state.currentConversationUsersObject.length; i++){
        if(state.currentConversationUsersObject[i].uid == newUser.uid) {
          isInUsers = true
          break
        }
      }
      if(!isInUsers) state.currentConversationUsersObject.push(newUser)
    },
    resetCurrentConversationUsers : (state) => {
      state.currentConversationUsersObject.length = 0
    },
    setCurrentConversationFiles : (state, newFiles) => {
      state.currentConversationFiles = newFiles
    },
    addNewFileToCurrentConversationFiles : (state, newFile) => {
      state.currentConversationFiles.push(newFile)
    },
    flushCurrentConversationFiles : (state) => {
      state.currentConversationFiles.length = [] //wtf
    },
    setCurrentProjectConversationDescription : (state, newCurrentProjectConversationDescription) => {
      state.currentConversationProjectDescription = newCurrentProjectConversationDescription
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
      FirebaseAPI.retrieveUser(newUser, (newUserObject)=>{
        commit('addUserToCurrentConversation', newUserObject)
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
    setNewCurrentConversation: ({dispatch, commit}, newCurrentConversation)=>{
      commit('setCurrentConversationId', newCurrentConversation.cid)
      commit('flushCurrentConversationFiles')
      commit('setCurrentConversationFiles', [])
      FirebaseAPI.registerFile(newCurrentConversation.cid)
      .on('child_added', (file)=>{
        commit('addNewFileToCurrentConversationFiles', file.val())
      })
      commit('resetCurrentConversationUsers')
      commit('setCurrentConversation', newCurrentConversation.name)
      Object.entries(newCurrentConversation.selectedUsers).forEach(([key, value]) => dispatch('retrieveUser', value))
      commit('setCurrentConversationUsers', newCurrentConversation.selectedUsers.length)
      commit('setCurrentProjectConversation', newCurrentConversation.project)
      commit('setCurrentProjectConversationDescription', newCurrentConversation.projectDescription)
      
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