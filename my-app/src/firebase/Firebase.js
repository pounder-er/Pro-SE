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
  getAllSaleReport = (success, reject) => {
    firebase.firestore().collection('SalesRoport')
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

  getAllHistoryInOut = (success, reject) => {
    firebase.firestore().collection('HistoryInOut')
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

  uploadImage= async(path,image,success,reject)=>{
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
  
  addProduct = (product) =>{
    let db = firebase.firestore(),
    productType = product.productType,
    companyID = product.companyID,
    prod = Object.assign({},product);
    prod.productType = db.collection('ProductType').doc(prod.productType);
    prod.companyID = db.collection('Company').doc(prod.companyID);
    prod.image = "";
    console.log(prod);

    return db.runTransaction((transaction)=>{
      return transaction
      .get(db.collection('Product').doc('state'))
      .then(doc=>{
        if (!doc.exists) {
          throw "Document does not exist!";
        }
        let state = doc.data().productCount,
        id,indexArr;     
        state.find((doc,index)=>{
          if(doc.id == productType+'1'+companyID){
            indexArr = index
            return true;
          }
        })
        let idReturn;
        if(indexArr != undefined){
         

          id = state[indexArr].id+state[indexArr].count;
          idReturn = id;
          transaction.set(db.collection('Product').doc(id), prod);

          state[indexArr].count = ("0"+(Number(state[indexArr].count)+1).toString()).slice(-2);
          transaction.update(db.collection('Product').doc('state'),{productCount:state});

          id = state[indexArr+1].id+state[indexArr+1].count;
          transaction.set(db.collection('Product').doc(id), prod);

          state[indexArr+1].count = ("0"+(Number(state[indexArr+1].count)+1).toString()).slice(-2);
          transaction.update(db.collection('Product').doc('state'),{productCount:state});
          
        }else{

          id = productType+'1'+companyID+'00';
          idReturn = id;
          transaction.set(db.collection('Product').doc(id), prod);

          state.push({id:productType+'1'+companyID,count:'01'});
          transaction.update(db.collection('Product').doc('state'),{productCount:state});

          id = productType+'0'+companyID+'00';
          transaction.set(db.collection('Product').doc(id), prod);

          state.push({id:productType+'0'+companyID,count:'01'});
          transaction.update(db.collection('Product').doc('state'),{productCount:state});
        }
        idReturn = idReturn.substring(2);
        return idReturn;
        // transaction.set(db.collection('Product').doc('11'), { test: count });
      })
    }).then((id)=>{
      console.log("Transaction successfully committed!",id);
    }).catch((error)=>{
      console.log("Transaction failed: ", error);
    })

  }
}
const fire_base = new Firebase();
export default fire_base;
