<template>
  <v-dialog
    v-model="timePickerMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-wdth="290px"
  >
    <template v-slot:activator="{ on }">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="userTime"
          :rules="startRules"
          placeholder="Choose Start Time..."
          color="indigo"
          label="Start Time:"
          outlined
          readonly
          append-icon="mdi-clock-outline"
          v-on="on"
        ></v-text-field>
      </v-col>
    </template>

    <v-time-picker
      v-model="time"
      :allowed-minutes="allowedStep"
      @click:minute="submit"
      color="indigo"
      header-color="indigo"
      format="ampm"
      ampm-in-title
    ></v-time-picker>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  name: "start-time-picker",
  data() {
    return {
      time: "",
      userTime: "",
      timePickerMenu: false,
      startRules: [v => !!v || "Start Time is required"]
    };
  },
  methods: {
    allowedStep: m => m % 30 === 0,
    getInput: time => moment(time, "hh:mm").format("h:mm A"),
    submit() {
      this.userTime = this.getInput(this.time);
      this.$emit("startTimeSent", this.userTime);
      this.timePickerMenu = !this.timePickerMenu;
    },
    close: () => (this.timePickerMenu = !this.timePickerMenu)
  }
};
</script>

<style></style>
