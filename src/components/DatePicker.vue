<template>
  <v-dialog
    v-model="datePickerMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-col cols="12">
        <v-text-field
          v-model="date"
          :rules="dateRules"
          color="indigo"
          :placeholder="todaysDate"
          outlined
          label="Date:"
          readonly
          append-icon="mdi-calendar-edit"
          v-on="on"
        ></v-text-field>
      </v-col>
    </template>
    <v-date-picker
      :events="dates"
      event-color="green lighten-1"
      :min="allowedDates"
      color="indigo"
      header-color="indigo"
      @input="submit"
      v-model="userDate"
    ></v-date-picker>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  name: "date-picker",
  props: ["events"],
  data() {
    return {
      date: "",
      userDate: moment().format("YYYY-MM-DD"),
      datePickerMenu: false,
      dates: [],
      dateRules: [v => !!v || "Date is required"]
    };
  },
  methods: {
    submit(input) {
      this.date = moment(input, "YYYY-MM-DD").format("MM/DD/YYYY");
      this.userDate = input;
      this.$emit("dateSent", this.userDate);
      this.$emit("reset");
      for (let event in this.events) {
        if (this.events[event].date === this.userDate) {
          this.$emit("booksSent", this.events[event]);
        }
      }

      this.datePickerMenu = !this.datePickerMenu;
    },
    close: () => (this.datePickerMenu = false),
    show() {}
  },
  computed: {
    allowedDates() {
      const today = moment().format("YYYY-MM-DD");
      return today;
    },
    todaysDate() {
      const today = moment().format("MM/DD/YYYY");
      return today;
    }
  },
  mounted() {
    for (let event in this.events) {
      this.dates.push(this.events[event].date);
    }
  }
};
</script>

<style></style>
