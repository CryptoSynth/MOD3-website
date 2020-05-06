<template>
  <v-menu
    v-model="timePickerMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-col cols="6">
        <v-text-field
          v-model="userTime"
          placeholder="Choose End Time..."
          :rules="endRules"
          color="indigo"
          label="End Time:"
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
  </v-menu>
</template>

<script>
import moment from "moment";

export default {
  name: "end-time-picker",
  data() {
    return {
      time: "",
      userTime: "",
      timePickerMenu: false,
      endRules: [v => !!v || "End Time is required"]
    };
  },
  methods: {
    allowedStep: m => m % 30 === 0,
    getInput: time => moment(time, "hh:mm").format("h:mm A"),
    submit() {
      this.userTime = this.getInput(this.time);
      this.$emit("endTimeSent", this.userTime);
      this.timePickerMenu = !this.timePickerMenu;
    },
    close: () => (this.timePickerMenu = !this.timePickerMenu)
  }
};
</script>

<style></style>
