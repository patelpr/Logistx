import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loads: [],
    equipments:[],
    drivers:[],
    
  },
  mutations: {
    getLoads (state) {
        try {
       firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("loads")
            .where("active", "==", true)
            .onSnapshot((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  state.loads.push(doc.data());
              });
            });
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
        console.log(state.loads)
    }
  }
})