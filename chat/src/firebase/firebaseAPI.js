import * as firebase from 'firebase'


const FirebaseAPI = {
    login : (email, password, processFn) =>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((signInUserData)=>{
          //vytiahnutie potrebnych dat o prihlasenom uzivatelovi
          //exctracting user info about the user
          firebase.database().ref('users/' + signInUserData.user.uid)
          .once('value', (userDataSnapshot) => 
            processFn({type : "success",data : userDataSnapshot.val()}))})
        .catch((error) => processFn({
                type : "error",
                data : "Chybne zadane prihlasovacie udaje. Error:" + error.message
            })
        )
    },
    createUser : (loginData, processFn) => {
        //vytvorenie uzivatela v auth firebase
        firebase.auth().createUserWithEmailAndPassword(loginData.email, loginData.password)
        .then((data)=>{
            //pridanie uzivatela do db firebase
            firebase.database().ref('users/' + data.user.uid).set(
            {
                uid : data.user.uid,
                name : loginData.name,
                conversations : {
                    '-LTKBaOMrTGddGs7OyVv' : true
                }
            })
            .then(firebase.database().ref('conversation/-LTKBaOMrTGddGs7OyVv/selectedUsers').push(data.user.uid)
            )
            //oboznamenie uzivatela o vysledku pridavania uzivatela1
            .then(()=>processFn({type: 'success', message: "Successfully registered. You can now log in"}))
        })
        .catch((error)=>processFn({type: 'error', message: "There was a problem with registration" + error.message}))
    },
    createNewConversation : (conv) =>{
        var newConversationRef = firebase.database().ref('conversations/').push(conv)
        var newConversationKey = newConversationRef.key
        FirebaseAPI.firestore.sendInitialMessage({
            content : 'This is the begininning of this conversation',
            name : 'WorkChatAdmin',
            uid : '3fa6FciusyTdhmBEqG9PKYfoifn2',
            timestamp : Date.now()
        }, conv.name)
        firebase.database().ref('conversations/' + newConversationKey).update({'cid' : newConversationKey})
        conv['selectedUsers'].forEach((user, index) => {
            firebase.database().ref('users/' + user + '/conversations/').update({[newConversationKey] : true})
            if(index == conv['selectedUsers'].length) return true;
        });
    },
    retrieveUsers: ()=>{
        return firebase.database().ref('users')
    },
    retrieveConversations: (uid)=>{
        return firebase.database().ref('users/' + uid + '/conversations')
    },
    retrieveConversationInfo : (cid)=>{
        return firebase.database().ref('conversations/' + cid)
    },
    
    firestore : {
        sendInitialMessage : (messageObject, collection)=>{
            firebase.firestore().collection(collection).add({
                content : messageObject.content,
                name: messageObject.name,
                uid : messageObject.uid,
                timestamp : Date.now()
            })
            .then((success)=>{
                return {
                    type : 'success',
                    message : success
                }
            })
            .catch((error)=>{
                return {
                    type : 'error',
                    message : error
                }
            })
        },
        sendMessage: (messageObject)=>{
            firebase.firestore().collection(messageObject.collection).add({
                content : messageObject.content,
                name: messageObject.sender.name,
                uid : messageObject.sender.uid,
                timestamp : Date.now()
            })
            .then((success)=>{
                return {
                    type : 'success',
                    message : success
                }
            })
            .catch((error)=>{
                return {
                    type : 'error',
                    message : error
                }
            })
        },
        getCollection : (cid)=>{
            return firebase.firestore().collection(cid)
            .orderBy("timestamp", "asc")
        }
    }

}

export default FirebaseAPI