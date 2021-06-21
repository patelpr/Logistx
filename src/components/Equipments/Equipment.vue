<template>
  <div>

  </div>
</template>

<script>
import firebase from 'firebase'
export default {
    data () {
        return {
            equipment:[]
        }
    },methods: {
       async getEquipment(){
           await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('equipment')

        }
    }

}
</script>

<style>

</style>