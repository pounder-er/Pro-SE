import firebase from 'firebase/app'
import '@firebase/firestore';
import { RiWheelchairLine } from 'react-icons/ri';
import { GiMonoWheelRobot } from 'react-icons/gi';

class Firestore {
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
        }
        else {
            console.log("firebase already running....")
        }
    }

    getProduct = (success, reject, task) => {
        let docID = firebase.firestore.FieldPath.documentId()
        firebase.firestore().collection('Product').where(docID, "in", task).get()
            .then(function (querySnapshot) {
                success(querySnapshot);
                // console.log("complete")
            })
            .catch(function (error) {
                reject(error);
            });
    }

    getTaskStock = (order, reject, email) => {
        // console.log(email)
        firebase.firestore().collection('TaskStock').where("person", "==", email).get()
            .then(function (querySnapshot) {
                order(querySnapshot);
                // let array = []

                // querySnapshot.forEach(querySnapshot => {
                //     let id = querySnapshot.id
                //     array.push(id)
                // })

                // this.getData(order, reject, array)
            })
            .catch(function (error) {
                reject(error);
            });
    }

    sendTask = (task, profile, successDelete) => {

        let array = []
        task.forEach(task => {
            array.push(task.id)
            // console.log(task.id)
        })

        // console.log(array)

        let docID = firebase.firestore.FieldPath.documentId()
        let day = new Date()
        let date = firebase.firestore.FieldValue.serverTimestamp()

        firebase.firestore().collection("HistoryStock").add({
            task: task,
            profile: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                date: date
            }
        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        firebase.firestore().collection("TaskStock").where(docID, "in", array).get()
            .then(function (querySnapshot) {
                successDelete(querySnapshot)
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });

            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }

    //-------------------------------- Pre Order Buying ---------------------------------//

    getTaskBuy = (order, reject, email) => {
        // console.log(email)
        firebase.firestore().collection('ImportOrder').where("person", "==", email).get()
            .then(function (querySnapshot) {
                order(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });
    }

    getPO = (success, reject, task) => {
        // console.log("in getPO : " + task)
        let docID = firebase.firestore.FieldPath.documentId()
        firebase.firestore().collection('Buy').where(docID, "in", task).get()
            .then(function (querySnapshot) {
                success(querySnapshot);
                // console.log("complete")
            })
            .catch(function (error) {
                reject(error);
            });

    }

    onSavePO =(idPO, log)=> {
        firebase.firestore().collection('Buy').doc(idPO).update({
            status: "เสร็จสิ้น",
            log: log
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}

const firestore = new Firestore()
export default firestore