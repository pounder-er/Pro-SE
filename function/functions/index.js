const functions = require('firebase-functions');
const builderFunction = functions.region('asia-southeast2').https;

const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const app = express();

app.post('/createUser',function(req, res){
  res.contentType('application/json');
  admin.auth().createUser({
          email: req.body.email,
          emailVerified: false,
          password: req.body.password,
          disabled: false,
        }).then((userRecord) => {
          res.send(JSON.stringify({userRecord}));
          // See the UserRecord reference doc for the contents of userRecord.
          //console.log('Successfully created new user:', userRecord.uid);
        })
        .catch((error) => {
          res.send(JSON.stringify({error}));
        });
  //       res.send("Hello from Firebase!");
  //       res.send({a:'hello yeahh'});

  //res.send(req.body);
  return res;
})

app.post('/updateEmailAndPassword',function(req, res){
  res.contentType('application/json');
  admin.auth().updateUser(req.body.uid,{
    email: req.body.email,
    password: req.body.password
  }).then((userRecord) => {
    admin.firestore()
    .collection('UserProfiles')
    .doc(userRecord.uid)
    .update({
      email: userRecord.email
    })
    // See the UserRecord reference doc for the contents of userRecord.
    res.send(JSON.stringify({userRecord}));
    //console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    res.send(JSON.stringify({error}));
  });

})

exports.appInventory = builderFunction.onRequest(app);

// exports.helloWorld = functions.region('asia-southeast2').https.onRequest((req, res) => {
//     await admin.auth().createUser({
//       email: req.body.email,
//       emailVerified: false,
//       password: req.body.password,
//       displayName: req.body.firstname,
//       photoURL: req.body.imageUrl,
//       disabled: false,
//     }).then((userRecord) => {
//       // See the UserRecord reference doc for the contents of userRecord.
//       //console.log('Successfully created new user:', userRecord.uid);
//     })
//     .catch((error) => {
//       console.log('Error creating new user:', error);
//     });
//     response.send("Hello from Firebase!");
//     res.send({a:'hello yeahh'});
//   });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.region('asia-southeast2').https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
