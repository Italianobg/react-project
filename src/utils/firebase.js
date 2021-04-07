import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

// var firebaseConfig = {
//     apiKey: "AIzaSyD0Noxq5r64DiLBXPblRioixvF7FwXF9rA",
//     authDomain: "react-project-4421f.firebaseapp.com",
//     projectId: "react-project-4421f",
//     storageBucket: "react-project-4421f.appspot.com",
//     messagingSenderId: "200359494121",
//     appId: "1:200359494121:web:2f45ee4827acef77fe4b78",
//     measurementId: "G-V5B1Z9ZGF6"
// };

var firebaseConfig = {
    apiKey: "AIzaSyCkZjyvJtBWZ5Rzp3Sb8J3rGygp8qYiVR0",
    authDomain: "react-project1-8f65f.firebaseapp.com",
    projectId: "react-project1-8f65f",
    storageBucket: "react-project1-8f65f.appspot.com",
    messagingSenderId: "1096360120435",
    appId: "1:1096360120435:web:cfe55c524f1ce43e255a06",
    measurementId: "G-WQ4BKYTPSP"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();

export {
    auth,
    storage,
    firestore,
    firebase as
    default
}