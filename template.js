const load = {
  num: null,
  driver: "",
  rate: null,
  ratecon: null,
  type: null,
  tracking: false,

  contact: {
    name: null,
    email: null,
    number: null,
  },
  origin: [
    {
      location: null,
      address: null,
      date: null,
      time: null,
      lumper: null,
      detention: null,
      layover: null,
      ref: null,
      notes: "",
      bolnum: null,
      sealnum: null,
    },
  ],
  destination: [
    {
      location: null,
      address: null,
      date: null,
      time: null,
      lumper: null,
      detention: null,
      layover: null,
      ref: null,
      notes: "",
      pod: null,
    },
  ],
};

//Upload , see later

function uploadRateCon(file, id) {
  var uploadTask = storageRef.child("ratecons/rivers.jpg").put(file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure,
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        firebase
          .firestore()
          .collection("users")
          .doc(this.$gapi.getUserData().id)
          .collection("loads")
          .doc(id)
          .update({ "load.ratecon": downloadURL });
        console.log("File available at", downloadURL);
      });
    }
  );
}

const drivers = {
  license: {
    number: null,
    url: null,
    class: null,
    expiration: null,
  },
  dob: null,
  name: null,
  address: null,
  ssn: null,
  check: {
    background: null,
    bg_url: null,
    mvr: null,
    mvr_url: null,
    drug: null,
    drug_url: null,
  },work:{
      history:{
          
      }
  },
  company_id:null
};

emailRules: [
  v => !!v || 'E-mail is required',
  v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
]

equipment:{
  type:null,
  num:null,
  mileage:null,
  active:true,
  year:null,
  make:"",
  model:'',
  vin:'',
  
}