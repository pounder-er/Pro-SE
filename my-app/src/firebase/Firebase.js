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
      .then((data) => {

        success(data);

      })
      .catch((error) => {
        reject(error);
      });
  }

  getUserProfile = (uid, success, reject) => {
    firebase.firestore().collection('UserProfiles').doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          success(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        reject(error);
      })
  }
  // /UserProfiles/1/0/00/00/32TqvA4r8X3Y0QSLgC5n
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
  getAllBuyReport = (success, reject) => {
    firebase.firestore().collection('Buy').where("status", "==", "สำเร็จ")
      .get()
      .then(querySnapshot => {
        success(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      })
  }
  getAllSellReport = (success, reject) => {
    firebase.firestore().collection('Buy').where("status", "==", "สำเร็จ")
      .get()
      .then(querySnapshot => {
        success(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      })
  }
  getAllProduct = (success, reject) => {
    firebase.firestore().collection('Product')
    .where(firebase.firestore.FieldPath.documentId(), '!=', 'state')
      .get()
      .then(querySnapshot => {
        success(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      })
  }

 
  getAllProductType = (success, reject) => {
    firebase.firestore().collection('ProductType')
    .where(firebase.firestore.FieldPath.documentId(), '!=', 'state')
      .get()
      .then(querySnapshot => {
        success(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      })
  }

  getAllCompany = (success, reject) => {
    firebase.firestore().collection('Company')
      .where(firebase.firestore.FieldPath.documentId(), '!=', 'state')
      .get()
      .then(querySnapshot => {
        success(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      })
  }

  getAllSell = (success, reject) => {
    firebase.firestore().collection('Sell')
      .where(firebase.firestore.FieldPath.documentId(), '!=', 'state')
      .get()
      .then(querySnapshot => {
        success(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      })
  }

  getAllBuy = (success, reject) => {
    firebase.firestore().collection('Buy')
      .where(firebase.firestore.FieldPath.documentId(), '!=', 'state')
      .get()
      .then(querySnapshot => {
        success(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      })
  }

  getProductCheckStock=(success, reject)=>{
    firebase.firestore().collection('Product')
    .where(firebase.firestore.FieldPath.documentId(), '!=', 'state')
    // .where('productTotal', '>', 0)
    .get()
    .then(querySnapshot => {
      success(querySnapshot);
    })
    .catch((error) => {
      reject(error);
    })
  }

  getUesrCheckStock = (success, reject) =>{
    firebase.firestore().collection('UserProfiles')
    .where('status', '==', 'ปกติ')
    .where('jobTitle', '==', 'พนักงานคลัง')
    .get()
    .then(querySnapshot => {
      success(querySnapshot);
    })
    .catch((error) => {
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
    profile.createDate = firebase.firestore.FieldValue.serverTimestamp();
    profile.status = 'ปกติ';
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

  updateUserProfile = (uid, profile, success, reject) => {
    firebase.firestore().collection('UserProfiles').doc(uid)
      .update(profile)
      .then(() => {
        success();
      })
      .catch((error) => {
        reject(error);
      })
  }

  updateCal = (uid, cal1, success, reject) => {
    firebase.firestore().collection('Product').doc(uid)
      .update(cal1)
      .then(() => {
        success();
      })
      .catch((error) => {
        reject(error);
      })
  }

  uploadImageProfile = async (uid, image, success, reject) => {
    let ref = await firebase
      .storage()
      .ref()
      .child('profile/' + uid);
    ref
      .put(image)
      .then(async (snapshot) => {
        await snapshot.ref.getDownloadURL().then((url) => {
          success(url, uid);
        });
      })
      .catch((error) => {
        reject(error);
      });
  }

  uploadImage = async (path, image, success, reject) => {
    let ref = await firebase
      .storage()
      .ref()
      .child(path);
    ref
      .put(image)
      .then(async (snapshot) => {
        await snapshot.ref.getDownloadURL().then((url) => {
          success(url);
        });
      })
      .catch((error) => {
        reject(error);
      });
  }


  listeningProfile = (success, reject) => {
    firebase.firestore().collection('UserProfiles')
      .where('firstName', '!=', 'แอดมิน')
      .onSnapshot(function (querySnapshot) {
        success(querySnapshot);
      }, function (error) {
        reject(error);
      });
  }
  listeningCal = (success, reject) => {
    firebase.firestore().collection('Product')
      .where(firebase.firestore.FieldPath.documentId(), '!=', 'state')
      .onSnapshot(function (querySnapshot) {
        success(querySnapshot);
      }, function (error) {
        reject(error);
      });
  }

  addCheckStock = (assignProduct,success, reject) =>{
    let batch = firebase.firestore().batch(), ref = firebase.firestore().collection('TaskStock');
    assignProduct.forEach(element => {
      batch.set(ref.doc(element.id),{person:element.email});
    });
    batch.commit()
    .then(()=>{
      success();
    })
    .catch(error=>{
      reject(error);
    })



  }

  addProduct = (product, success, reject) => {
    let db = firebase.firestore(),
      productType = product.productType,
      companyID = product.companyID,
      prod = Object.assign({}, product);
    prod.productStatus = 'ปกติ';
    prod.cal = {
      C: '',
      D: '',
      L: '',
      O: '',
      U: '',
      d: '',
    }
    prod.productTotal = 0
    prod.productType = db.collection('ProductType').doc(prod.productType);
    prod.companyID = db.collection('Company').doc(prod.companyID);
    prod.image = "";

    return db.runTransaction((transaction) => {
      return transaction
        .get(db.collection('Product').doc('state'))
        .then(doc => {
          if (!doc.exists) {
            throw "Document does not exist!";
          }
          let state = doc.data().productCount, id, indexArr;

          state.find((doc, index) => {
            if (doc.id == productType + companyID) {
              indexArr = index
              return true;
            }
          })

          if (indexArr != undefined) {


            id = state[indexArr].id + state[indexArr].count;

            transaction.set(db.collection('Product').doc([id[0], '1', id.slice(1)].join('')), prod);
            transaction.set(db.collection('Product').doc([id[0], '0', id.slice(1)].join('')), prod);

            state[indexArr].count = ("0" + (Number(state[indexArr].count) + 1).toString()).slice(-2);
            transaction.update(db.collection('Product').doc('state'), { productCount: state });

          } else {
            id = productType + companyID + '00';

            transaction.set(db.collection('Product').doc([id[0], '1', id.slice(1)].join('')), prod);
            transaction.set(db.collection('Product').doc([id[0], '0', id.slice(1)].join('')), prod);

            state.push({ id: productType + companyID, count: '01' });
            transaction.update(db.collection('Product').doc('state'), { productCount: state });
          }
          return id;
        })
    }).then((id) => {
      success(id);
    }).catch((error) => {
      reject(error);
    })

  }

  updateProduct = (id, product, success, reject) => {
    let batch = firebase.firestore().batch(), ref = firebase.firestore().collection('Product');
    batch.update(ref.doc([id[0], '1', id.slice(1)].join('')), product);
    batch.update(ref.doc([id[0], '0', id.slice(1)].join('')), product);
    batch.commit()
      .then(() => {
        success();
      })
      .catch((error) => {
        reject(error);
      })
  }

  addPO=(data, success, reject)=>{
    data.dateCreate = firebase.firestore.FieldValue.serverTimestamp();
    var stateRef = firebase.firestore().collection('Buy').doc('state')
    return firebase.firestore().runTransaction((transaction)=>{
      return transaction.get(stateRef).then((stateDoc)=>{
        data.companyID  = firebase.firestore().collection('Company').doc(data.companyID)
        for(let x of data.log){
          x.productID = firebase.firestore().collection('Product').doc(x.productID)
        }
        if(!stateDoc.exists){
          throw "Document does not exist!";
        }

        let state = stateDoc.data().count
        var newState = parseInt(state)+1
        
        if(newState/10 < 1){
          newState = newState.toString()
          newState = '000'+newState
        }else if(newState/100<1){
          newState = newState.toString()
          newState = '00'+newState
        }else if(newState/1000<1){
          newState = newState.toString()
          newState = '0'+newState
        }
        else{
          newState = newState.toString()
        }
        transaction.update(stateRef, {count : newState})
        
        firebase.firestore().collection('Buy').doc("PO"+state)
        .set(data)
        .then(()=>{
          success();
        })
        .catch((error)=>{
          reject(error);
        });
      })
    })
    .then()
    .catch((error)=>{
      console.log(error)
    });
  }


}
const fire_base = new Firebase();
export default fire_base;
