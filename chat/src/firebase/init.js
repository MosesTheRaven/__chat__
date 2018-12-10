import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_pe1P_smAM6JnQHn84PHAD6zUJqnWGbM",
    authDomain: "chat-12442.firebaseapp.com",
    databaseURL: "https://chat-12442.firebaseio.com",
    projectId: "chat-12442",
    storageBucket: "chat-12442.appspot.com",
    messagingSenderId: "404707661205"
  };
  firebase.initializeApp(config);

  firebaseApp.firestore().settings({timestampsInSnapshots: true}); 

  const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()