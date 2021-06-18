<template>
    <v-stepper v-model="e1" non-linear elevation="0">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1" editable>
        Equpiment Type
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2" editable>
        Equipment Specs
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3" editable> Equipment Assign </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12 pa-12" elevation="0">
          <v-row>
            <h3>Equpiment Type</h3>
          </v-row>
          <v-row>
            
          </v-row>
        </v-card>

        <v-btn color="primary" @click="e1++"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12 pa-12" elevation="0">
          <v-row>
            <h3>Delivery Information</h3>
          </v-row>
          <v-row>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="e1++"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12 pa-12" elevation="0">
          <v-row>
            <h3>Additional Load Details</h3>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                name="weight"
                label="Weight"
                v-mask="'######'"
                v-model="load.weight"
                single-line
              >
                <v-icon slot="prepend"> mdi-weight </v-icon>
                <v-icon slot="append"> mdi-weight-pound </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                name="rate"
                type="number"
                v-mask="'######'"
                label="Rate"
                v-model="load.rate"
                single-line
              >
                <v-icon slot="prepend"> mdi-currency-usd </v-icon>
                <v-icon slot="append"> mdi-decimal </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                name="type"
                label="Type"
                v-model="load.type"
                placeholder="Reefer / Van"
                single-line
              >
                <v-icon slot="prepend"> mdi-truck-outline </v-icon>
                <v-icon slot="append"> mdi-truck-trailer </v-icon></v-text-field
              >
            </v-col>
          </v-row>
          <v-row>
            <h3>Contact Details</h3>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                name="contact_name"
                label="Contact Name"
                v-model="load.contact.name"
                placeholder="Name"
                single-line
              >
                <v-icon slot="append"> mdi-account </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                name="contact_number"
                label="Contact Number"
                v-mask="'(###) ###-####'"
                v-model="load.contact.number"
                placeholder="Number"
                single-line
              >
                <v-icon slot="append"> mdi-phone </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                name="contact_email"
                label="Contact Email"
                v-model="load.contact.email"
                placeholder="Email"
                :rules="emailRules"
                single-line
              >
                <v-icon slot="append"> mdi-at </v-icon></v-text-field
              >
            </v-col>
          </v-row>
          <v-row>
            <v-checkbox
              v-model="load.tracking"
              label="Tracking Required"
            ></v-checkbox>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <Address :load="load.origin" title="Pickup" />

              <v-btn class="ma-2" @click="e1 = 1">EDIT ORIGIN </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <Address :load="load.destination" title="Delivery" />
              <v-btn class="ma-2" @click="e1 = 2">EDIT DELIVERY</v-btn>
            </v-col>
          </v-row>
          <v-row>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="saveRoute()"> Book Load </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {


}
</script>

<style>

</style>