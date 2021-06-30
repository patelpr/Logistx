// const load = {
//   num: null,
//   driver: "",
//   rate: null,
//   ratecon: null,
//   type: null,
//   tracking: false,

//   contact: {
//     name: null,
//     email: null,
//     number: null,
//   },
//   origin: [
//     {
//       location: null,
//       address: null,
//       date: null,
//       time: null,
//       lumper: null,
//       detention: null,
//       layover: null,
//       ref: null,
//       notes: "",
//       bolnum: null,
//       sealnum: null,
//     },
//   ],
//   destination: [
//     {
//       location: null,
//       address: null,
//       date: null,
//       time: null,
//       lumper: null,
//       detention: null,
//       layover: null,
//       ref: null,
//       notes: "",
//       pod: null,
//     },
//   ],
// };

// //Upload , see later

// function uploadRateCon(file, id) {
//   var uploadTask = storageRef.child("ratecons/rivers.jpg").put(file);

//   // Register three observers:
//   // 1. 'state_changed' observer, called any time the state changes
//   // 2. Error observer, called on failure,
//   // 3. Completion observer, called on successful completion
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       // Observe state change events such as progress, pause, and resume
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log("Upload is " + progress + "% done");
//       switch (snapshot.state) {
//         case firebase.storage.TaskState.PAUSED: // or 'paused'
//           console.log("Upload is paused");
//           break;
//         case firebase.storage.TaskState.RUNNING: // or 'running'
//           console.log("Upload is running");
//           break;
//       }
//     },
//     (error) => {
//       // Handle unsuccessful uploads
//     },
//     () => {
//       // Handle successful uploads on complete
//       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//         firebase
//           .firestore()
//           .collection("users")
//           .doc(firebase.auth().currentUser.uid)
//           .collection("loads")
//           .doc(id)
//           .update({ "load.ratecon": downloadURL });
//         console.log("File available at", downloadURL);
//       });
//     }
//   );
// }

// const drivers = {
//   license: {
//     number: null,
//     url: null,
//     class: null,
//     expiration: null,
//   },
//   dob: null,
//   name: null,
//   address: null,
//   ssn: null,
//   check: {
//     background: null,
//     bg_url: null,
//     mvr: null,
//     mvr_url: null,
//     drug: null,
//     drug_url: null,
//   },work:{
//       history:{
          
//       }
//   },
//   company_id:null
// };

// emailRules: [
//   v => !!v || 'E-mail is required',
//   v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
// ]

// equipment:{
//   type:null,
//   num:null,
//   mileage:null,
//   active:true,
//   year:null,
//   make:"",
//   model:'',
//   vin:'',
  
// }



// var uiConfig = {
//   signInSuccessUrl: "localhost:8080", // Assuming you are running on your local machine
//   signInOptions: [
//     {
//       provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       scopes: config.scopes,
//     },
//   ],
//   // Terms of service url.
//   tosUrl: "/",
// };

// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// // The start method will wait until the DOM is loaded.
// ui.start("#firebaseui-auth-container", uiConfig);

// // This function will trigger when there is a login event
// firebase.auth().onAuthStateChanged(function(user) {
//   console.log(user);
//   // Make sure there is a valid user object
//   if (user) {
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "https://apis.google.com/js/api.js";
//     // Once the Google API Client is loaded, you can run your code
//     script.onload = function(e) {
//       // Initialize the Google API Client with the config object
//       gapi.client
//         .init({
//           apiKey: config.apiKey,
//           clientId: config.clientID,
//           discoveryDocs: config.discoveryDocs,
//           scope: config.scopes.join(" "),
//         })
//         // Loading is finished, so start the app
//         .then(function() {
//           // Make sure the Google API Client is properly signed in
//           if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
//             startApp(user);
//           } else {
//             firebase.auth().signOut(); // Something went wrong, sign out
//           }
//         });
//     };
//     // Add to the document
//     document.getElementsByTagName("head")[0].appendChild(script);
//   }
// });

// function startApp(user) {
//   console.log(user);

//   // Make sure to refresh the Auth Token in case it expires!
//   firebase
//     .auth()
//     .currentUser.getToken()
//     .then(function() {
//       return gapi.client.calendar.events.list({
//         calendarId: "primary",
//         timeMin: new Date().toISOString(),
//         showDeleted: false,
//         singleEvents: true,
//         maxResults: 10,
//         orderBy: "startTime",
//       });
//     })
//     .then(function(response) {
//       console.log(response);
//     });
// }
