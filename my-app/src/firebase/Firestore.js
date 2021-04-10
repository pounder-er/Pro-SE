import firebase from 'firebase/app';
import 'firebase/firestore';

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
    } else {
      console.log('firebase apps already running....');
    }
  }

  addPartnerCompany = (data, success, fail) => {
    firebase.firestore().collection('PartnerCompany')
      .add(data)
      .then(function (docRef) {
        success(docRef)
      })
      .catch(function (error) {
        fail(error)
      });

  }

  updatePartner = (id, data, success, reject) => {
    firebase.firestore().collection('PartnerCompany')
      .doc(id)
      .update(data)
      .then(function () {
        success()
      })
      .catch(function (error) {
        reject(error)
      });
  }

  addBranch = (data, success, fail) => {
    firebase.firestore().collection('Branch')
      .add(data)
      .then(function (docRef) {
        success(docRef)
      })
      .catch(function (error) {
        fail(error)
      });

  }

  listeningBranch = (success, reject) => {
    firebase.firestore().collection('Branch')
      .onSnapshot(function (querySnapshot) {
        console.log("hi from listen brh")
        success(querySnapshot);
      }, function (error) {
        reject(error);
      });
  }

  updateBranch = (id, data, success, reject) => {
    firebase.firestore().collection('Branch')
      .doc(id)
      .update(data)
      .then(function () {
        success()
      })
      .catch(function (error) {
        reject(error)
      });
  }

  getAllUserProfile = (success, reject) => {
    firebase.firestore().collection('UserProfiles')
      .get()
      .then(querySnapshot => {
        success(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      })
  }

  // listeningPartnerCompany = (success,reject) =>{
  //   firebase.firestore().collection('PartnerCompany')
  //   .onSnapshot(function (querySnapshot) {
  //     success(querySnapshot);
  //   }, function (error) {
  //     reject(error);
  //   });
  // }

  listeningPartnerCompany = (success, reject) => {
    firebase.firestore().collection('Company')
      .onSnapshot(function (querySnapshot) {
        success(querySnapshot);
      }, function (error) {
        reject(error);
      });
  }

  getAllPartnerCompany = (success, reject) => {
    firebase.firestore().collection('PartnerCompany')
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  }

  addVender = (data, success, reject) => {
    var stateRef = firebase.firestore().collection('Company').doc('state')
    return firebase.firestore().runTransaction((transaction) => {
      return transaction.get(stateRef).then((stateDoc) => {
        if (!stateDoc.exists) {
          throw "Document does not exist!";
        }

        let state = stateDoc.data().count
        var newState = parseInt(state) + 1

        if (newState / 10 < 1) {
          newState = newState.toString()
          newState = '0' + newState
        } else {
          newState = newState.toString()
        }
        transaction.update(stateRef, { count: newState })

        firebase.firestore().collection('Company').doc(state)
          .set(data)
          .then(() => {
            success();
          })
          .catch((error) => {
            reject(error);
          });
      })
    })
      .then()
      .catch((error) => {
        console.log(error)
      });
  }

  addBranchV2 = (data, success, reject) => {
    var stateRef = firebase.firestore().collection('Branch').doc('state')
    return firebase.firestore().runTransaction((transaction) => {
      return transaction.get(stateRef).then((stateDoc) => {
        if (!stateDoc.exists) {
          throw "Document does not exist!";
        }

        let state = stateDoc.data().count
        var newState = parseInt(state) + 1

        if (newState / 10 < 1) {
          newState = newState.toString()
          newState = '0' + newState
        } else {
          newState = newState.toString()
        }
        transaction.update(stateRef, { count: newState })

        firebase.firestore().collection('Branch').doc(state)
          .set(data)
          .then(() => {
            success();
          })
          .catch((error) => {
            reject(error);
          });
      })
    })
      .then()
      .catch((error) => {
        console.log(error)
      });
  }

  getCountSellOrderComplete = (success, reject) => {
    let day = []
    let ts_currentDate = firebase.firestore.Timestamp.now()

    let currentDate = ts_currentDate.toDate()
    currentDate.setHours(0)
    currentDate.setMinutes(0)
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0)
    console.log(currentDate)

    let currentDate_end = ts_currentDate.toDate()
    currentDate_end.setHours(0)
    currentDate_end.setMinutes(0)
    currentDate_end.setSeconds(0)
    currentDate_end.setMilliseconds(0)
    console.log(currentDate_end)

    let i_start = 1
    let i_end = -1;
    for (let i = 1; i >= -5; i--) {
      currentDate.setDate(currentDate.getDate() + i_start);
      currentDate_end.setDate(currentDate_end.getDate() + i_end);

      if (i_start == 1)
        i_start = -1

      console.log('start : ' + currentDate)
      console.log('stop : ' + currentDate_end)

      let ts = firebase.firestore.Timestamp.fromDate(currentDate);
      let ts_end = firebase.firestore.Timestamp.fromDate(currentDate_end);
      // console.log(ts.toDate().toString())
      firebase.firestore().collection('Sell')
        .where('dateOut', '<', ts)
        .where('dateOut', '>', ts_end)
        .get()
        .then(function (querySnapshot) {
          console.log(querySnapshot.size)
          day.push(querySnapshot.size)
          // success(querySnapshot.size)
          success(day)
        })
        .catch();

    }

    console.log(day)

  }

  getCountBuyOrderComplete = (success, reject) => {
    let day = []
    let ts_currentDate = firebase.firestore.Timestamp.now()

    let currentDate = ts_currentDate.toDate()
    currentDate.setHours(0)
    currentDate.setMinutes(0)
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0)
    console.log(currentDate)

    let currentDate_end = ts_currentDate.toDate()
    currentDate_end.setHours(0)
    currentDate_end.setMinutes(0)
    currentDate_end.setSeconds(0)
    currentDate_end.setMilliseconds(0)
    console.log(currentDate_end)

    let i_start = 1
    let i_end = -1;
    for (let i = 1; i >= -5; i--) {
      currentDate.setDate(currentDate.getDate() + i_start);
      currentDate_end.setDate(currentDate_end.getDate() + i_end);

      if (i_start == 1)
        i_start = -1

      console.log('start : ' + currentDate)
      console.log('stop : ' + currentDate_end)

      let ts = firebase.firestore.Timestamp.fromDate(currentDate);
      let ts_end = firebase.firestore.Timestamp.fromDate(currentDate_end);
      // console.log(ts.toDate().toString())
      firebase.firestore().collection('Buy')
        .where('dateIn', '<', ts)
        .where('dateIn', '>', ts_end)
        .get()
        .then(function (querySnapshot) {
          console.log(querySnapshot.size)
          day.push(querySnapshot.size)
          // success(querySnapshot.size)
          success(day)
        })
        .catch();

    }

    console.log(day)

  }

  getAllHistoryStock=(success, reject)=>{
    firebase.firestore().collection('HistoryStock')
    .get()
    .then(function(querySnapshot){
      success(querySnapshot)
    })
    .catch(function(error){
      reject(error)
    });
  }



}
const firestore = new Firestore();
export default firestore