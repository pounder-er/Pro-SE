import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

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
      .then((data)=>{
        
        success(data);
        
      })
      .catch((error)=>{
        reject(error);
      });
  }

  getUserProfile = (uid, success, reject) =>{
    firebase.firestore().collection('UserProfiles').doc(uid)
    .get()
    .then(doc=>{
      if (doc.exists) {
        success(doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error)=>{
      reject(error);
    })
  }

  getAllUserProfile = (success,reject)=>{
    firebase.firestore().collection('UserProfiles')
    .get()
    .then(querySnapshot=>{
        success(querySnapshot);
    })
    .catch((error)=>{
      reject(error);
    })
  }

  getStateChangedUser = (success, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        success(user);
      } else {
        reject();
      }
    })
  }

  addUserProfile = (uid, profile, success, reject) => {
    firebase.firestore().collection('UserProfiles').doc(uid)
      .set(profile)
      .then((docRef) => {
        success();
        //console.log(docRef);
      })
      .catch((error) => {
        reject(error);
      });
  }

  uploadImageProfile=async(uid,image,success,reject)=>{
    var ref = await firebase
      .storage()
      .ref()
      .child('profile/'+uid);
    ref
      .put(image)
      .then(async (snapshot) => {
        await snapshot.ref.getDownloadURL().then((url) => {
          success(url,uid);
        });
      })
      .catch((error) => {
        reject(error);
      });
  }

}
const fire_base = new Firebase();
export default fire_base;
