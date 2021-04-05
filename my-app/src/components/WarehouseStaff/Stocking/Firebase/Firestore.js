import firebase from 'firebase/app'
import '@firebase/firestore';

class Firestore {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                //  SE Example  //
                apiKey: "AIzaSyBHim8s2GhKMpECeHuHzEsnWxrQeCV2w1s",
                authDomain: "se-example-e0f42.firebaseapp.com",
                projectId: "se-example-e0f42",
                storageBucket: "se-example-e0f42.appspot.com",
                messagingSenderId: "66705788030",
                appId: "1:66705788030:web:63aefaae51c5f6c1635c2f",
                measurementId: "G-L31B3MB6HJ"

                // SE real  //
                // apiKey: "AIzaSyD-tHJpcpFLvM9n4NUV4Jjm4WJ9bdMvkC8",
                // authDomain: "se-inventory.firebaseapp.com",
                // projectId: "se-inventory",
                // storageBucket: "se-inventory.appspot.com",
                // messagingSenderId: "833677955173",
                // appId: "1:833677955173:web:7566ab936d84e9d1bef68c",
                // measurementId: "G-Y96K6BXN6R"
            });
        }
        else {
            console.log("firebase already running....")
        }
    }

    getData = (success, reject) => {
        firebase.firestore().collection('Product').get()
            .then(function (querySnapshot) {
                success(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });
    }
}

const firestore = new Firestore()
export default firestore