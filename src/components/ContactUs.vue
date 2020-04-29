<template>
  <v-dialog dark v-model="contactUsMenu" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" dark rounded color="indigo">Contact Us</v-btn>
    </template>

    <v-card light>
      <v-card-title>Contact Us</v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-form>
          <v-text-field label="Name"></v-text-field>
          <v-text-field label="Email"></v-text-field>
          <v-text-field label="Phone"></v-text-field>
          <v-textarea solo label="textarea"></v-textarea>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded color="red" outlined @click="close">Cancel</v-btn>
        <v-btn class="white--text" rounded color="indigo">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "contact-us",
  data() {
    return {
      popout: false,
      hover: false,
      contactUsMenu: false
    };
  },
  methods: {
    close() {
      this.contactUsMenu = false;
    }
  }
};
</script>

<style>
</style>