import firebase from 'firebase/app';
import 'firebase/firestore';

class Firestore {
    constructor(){
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

    addPartnerCompany =(data, success, fail)=>{
        firebase.firestore().collection('PartnerCompany')
        .add(data)
        .then(function(docRef){
          success(docRef)
        })
        .catch(function(error){
          fail(error)
        });

    }

    updatePartner=(id, data, success, reject)=>{
        firebase.firestore().collection('PartnerCompany')
        .doc(id)
        .update(data)
        .then(function(){
            success()
        })
        .catch(function(error){
            reject(error)
        });
    }

    addBranch =(data, success, fail)=>{
      firebase.firestore().collection('Branch')
      .add(data)
      .then(function(docRef){
        success(docRef)
      })
      .catch(function(error){
        fail(error)
      });

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

    listeningPartnerCompany = (success,reject) =>{
      firebase.firestore().collection('PartnerCompany')
      .onSnapshot(function (querySnapshot) {
        success(querySnapshot);
      }, function (error) {
        reject(error);
      });
    }

    getAllPartnerCompany =(success, reject)=>{
      firebase.firestore().collection('PartnerCompany')
      .get()
      .then(function(querySnapshot){
        success(querySnapshot);
      })
      .catch(function(error){
        reject(error);
      });
    }
}
const firestore = new Firestore();
export default firestore