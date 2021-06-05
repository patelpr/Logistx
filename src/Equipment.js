import firebase from "firebase";
export default class Equipment {
  constructor(num, trailer, additions, length, maxWeight, fp, active) {
    this.num = num;
    this.trailer = trailer;
    this.additions = additions;
    this.length = length;
    this.maxWeight = maxWeight;
    this.fp = fp;
    this.active = active;
  }
  addEquipment(equipment) {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser)
      .collections("equipment")
      .add({
        equipment,
      });
  }
  updateEquipment(id, update) {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser)
      .collections("equipment")
      .doc(id)
      .update(equipment);
  }
  deleteEquipment(id) {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser)
      .collections("equipment")
      .doc(id)
      .delete();
  }
}
