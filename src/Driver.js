import firebase from "firebase";
export default class Driver {
  constructor(firstname,lastname,ssn,license, state, home,dob,) {}
  addDriver(driver) {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser)
      .collections("driver")
      .add({
        driver,
      });
  }
  updateDriver(id, driver) {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser)
      .collections("driver")
      .doc(id)
      .update(driver);
  }
  deleteDriver(id) {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser)
      .collections("driver")
      .doc(id)
      .delete();
  }
}
