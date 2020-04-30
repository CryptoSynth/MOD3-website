<template>
  <v-container pa-0 fluid>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="11">
        <v-menu
          v-model="timePickerMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="timeNow"
              color="indigo"
              label="Time:"
              outlined
              append-icon="mdi-clock-outline"
              v-on="on"
            ></v-text-field>
          </template>

          <v-time-picker
            color="indigo"
            header-color="indigo"
            format="ampm"
            v-model="time"
            ampm-in-title
          >
            <v-spacer></v-spacer>
            <v-btn text color="indigo" @click="close">Cancel</v-btn>
            <v-btn text color="indigo" @click="submit">Ok</v-btn>
          </v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: "time-picker",
  data() {
    return {
      time: "",
      timeNow: this.getTime(),
      timePickerMenu: false,
      date: new Date()
    };
  },
  methods: {
    submit() {
      this.$emit("timeSelected", this.time);
    },
    close() {
      if (this.time) {
        this.timeNow = this.getInput(this.time);
      }
      this.timePickerMenu = !this.timePickerMenu;
    }
  },

  computed: {
    getTime() {
      return moment().format("LT");
    },
    getInput(time) {
      const timeArray = time.split(":");
      const joinedArray = timeArray.join("");

      return moment(joinedArray, "hmm").format("h:mm A");
    }
  }
};
</script>

<style>
</style>