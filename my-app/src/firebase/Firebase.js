import firebase from 'firebase/app';
import 'firebase/auth';

class Firebase {
    constructor() {
      if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyD-tHJpcpFLvM9n4NUV4Jjm4WJ9bdMvkC8",
            authDomain: "se-inventory.firebaseapp.com",
            projectId: "se-inventory",
            storageBucket: "se-inventory.appspot.com",
            messagingSenderId: "833677955173",
            appId: "1:833677955173:web:7566ab936d84e9d1bef68c",
            measurementId: "G-Y96K6BXN6R"
        });
      } else {
        console.log('firebase apps already running....');
      }
    }
  
    login = (email, password, success, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (res) {
          success(res);
        })
        .catch(function (error) {
          reject(error);
        });
    }
  
    logOut = (success, reject) => {
      firebase.auth().signOut()
        .then(function () {
          success();
        })
        .catch(function (error) {
          reject(error);
        });
    }
  
    createUser = (email, password, success, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {
          success(data);
        })
        .catch(function (error) {
          reject(error);
        });
    }

    getStateChangedUser = (success, reject) =>{
      firebase.auth().onAuthStateChanged(user=>{
        if (user) {
          success(user);
        }else{
          reject();
        }
      })
    }

  }
  const fire_base = new Firebase();
  export default fire_base;
  