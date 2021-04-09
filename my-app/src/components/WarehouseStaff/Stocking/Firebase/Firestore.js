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
                console.log("complete")
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

    updateTotalPruduct =(proID, item)=>{
        firebase.firestore().collection('Product').doc(proID).update({
            productTotal : firebase.firestore.FieldValue.increment(item) 
        })
            .then(() => {
                console.log("Document successfully updated in Total");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    onSavePO = (idPO, log, taskDel) => {
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
        
        // console.log(log)
        log.forEach((data)=>{
            // console.log(data.productID.id)
            this.updateTotalPruduct(data.productID.id,data.volume)
        })

        firebase.firestore().collection("ImportOrder").doc(idPO).delete()
        .then(function (querySnapshot) {
            taskDel(querySnapshot)

        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }

    //-------------------------------- Sell Order  ---------------------------------//
    getTaskSell = (order, reject, email) => {
        firebase.firestore().collection('ExportOrder').where("person", "==", email).get()
            .then(function (querySnapshot) {
                order(querySnapshot);
            })
            .catch(function (error) {
                reject(error);
            });
    }
    getSO = (success, reject, task) => {
        console.log("in getPO : " + task)
        let docID = firebase.firestore.FieldPath.documentId()
        firebase.firestore().collection('Sell').where(docID, "in", task).get()
            .then(function (querySnapshot) {
                success(querySnapshot);
                // console.log("complete")
            })
            .catch(function (error) {
                reject(error);
            });
    }

    onSaveSO = (idSO, taskDel) => {
        firebase.firestore().collection('Sell').doc(idSO).update({
            status: "กำลังจัดส่ง"
            // ----- คำสั่งตัวอย่าง -----
            // status: "รอชำระเงิน"
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        // let docID = firebase.firestore.FieldPath.documentId()

        firebase.firestore().collection("ExportOrder").doc(idSO).delete()
            .then(function (querySnapshot) {
                taskDel(querySnapshot)

            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }
    //-------------------------- get Ref -------------------------- //

    getBranchNameByRef = (ref, changeName) => {
        console.log(ref)
        console.log(ref.id)
        console.log(ref.parent.id)

        return firebase.firestore().collection(ref.parent.id).doc(ref.id).get()
            .then(function (querySnapshot) {
                // console.log(querySnapshot.data().companyName)
                // return querySnapshot.data().companyName
                changeName(querySnapshot)

            })
            .catch(function (error) {
                console.error(error);
            });
    }

    getCompanyNameByRef = (ref, changeName) => {
        console.log(ref)
        console.log(ref.id)
        console.log(ref.parent.id)

        return firebase.firestore().collection(ref.parent.id).doc(ref.id).get()
            .then(function (querySnapshot) {
                // console.log(querySnapshot.data().companyName)
                // return querySnapshot.data().companyName
                changeName(querySnapshot)

            })
            .catch(function (error) {
                console.error(error);
            });
    }

    getProductNameByRef = (ref) => {
        console.log(ref)
        console.log(ref.id)
        console.log(ref.parent.id)

        firebase.firestore().collection(ref.parent.id).doc(ref.id).get()
            .then(function (querySnapshot) {
                console.log(querySnapshot.productName)
            })
            .catch(function (error) {
                console.error(error);
            });
    }
}

const firestore = new Firestore()
export default firestore