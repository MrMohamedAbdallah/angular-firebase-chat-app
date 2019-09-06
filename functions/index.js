const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Create Message
exports.createMessageRoom = functions.https.onCall((data, context) => {
  console.log("The top");
  if (
    context.auth.uid == null ||
    !data.userID ||
    context.auth.uid == data.userID
  ) {
    return {
      message: "Unauthorized"
    };
  }

  // Get the user
  const userID1 = context.auth.uid;
  const userID2 = data.userID;

  // Collection ref
  const collection = admin.firestore().collection("/messages");

  // Get the collection
  return collection
    .where("user1", "==", userID1)
    .where("user2", "==", userID2)
    .get()
    .then(snapshot => {
      if (snapshot.docs.length) {
        return snapshot;
      }

      return collection
        .where("user1", "==", userID2)
        .where("user2", "==", userID1)
        .get();
    })
    .then(snapshot => {
      if (snapshot.docs.length) {
        return snapshot.docs[0];
      }

      // Create new doc
      return collection.add({
        user1: userID1,
        user2: userID2
      });
    })
    .then(doc => {
      return doc.id;
    })
    .catch(err => {
      console.log(err);
    });
});

// Create a user profile document when the user is created
exports.createUserProfile = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection("/users")
    .doc(user.uid)
    .set({
      userID: user.uid,
      email: user.email
    });
});

// Send message
// exports.sendMessage = functions.https.onCall((data, context) => {
//   if (!data.content || !data.to || !context.auth.uid) {
//     return "Unauthorized";
//   }

//   let to = data.to;
//   let from = context.auth.uid;
//   let username = context.auth.displayName;

//   this.admin
//     .firestore()
//     .collection(`/messages`)
//     .doc(to)
//     .get()
//     .then( doc => {
//       if(doc && (doc.user1 == from || doc.user2 == from)){

//         doc.ad

//       } else {
//         return 'Unauthorized'
//       }
//     })
//     .catch( err => {
//       console.log(err);
//     });
// });


// Add userID and createdAt to the messages
// =================================
//    Doesn't work for some reason
// ==================================
// exports.createMessage = functions.database
//   .ref("/messages/{roomID}/messages")
//   .onCreate((snapshot, context) => {
//     let userID = context.auth.uid;
//     let time = Date.now();

//     console.log("User ID:", userID);
//     console.log("Time:", time);

//     return snapshot.ref.set({
//       from: userID,
//       createdAt: time
//     });
//   });
