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
            console.log(data, loginData)
            //pridanie uzivatela do db firebase
            firebase.database().ref('users/' + data.user.uid).set(
            {
                uid : data.user.uid,
                name : loginData.name,
            })
            //oboznamenie uzivatela o vysledku pridavania uzivatela1
            .then(()=>processFn({type: 'success', message: "Uzivatel bol uspesne pridany!"}))
        })
        .catch((error)=>processFn({type: 'error', message: "Pri pridavani uzivatela doslo k chybe!\n" + error.message}))
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
        sendMessage: (messageObject)=>{
            firebase.firestore().collection('messages').add({
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