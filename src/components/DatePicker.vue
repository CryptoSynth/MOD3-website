<template>
  <v-dialog
    v-model="dateMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-col cols="12">
        <v-text-field
          v-model="dateInput"
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
      :events="date.dates"
      event-color="green lighten-1"
      :min="allowedDates"
      color="indigo"
      header-color="indigo"
      @input="inputDate"
      v-model="userDate"
    ></v-date-picker>
  </v-dialog>
</template>

<script>
import moment from "moment";
import { mapState, mapActions } from "vuex";

export default {
  name: "date-picker",

  props: ["availabilityTimes"],

  data() {
    return {
      dateRules: [v => !!v || "Date is required"]
    };
  },

  methods: {
    ...mapActions("date", [
      "submitDate",
      "updateDate",
      "updateUserDate",
      "updateDateMenu",
      "getBookDates",
      "availability"
    ]),

    inputDate(input) {
      this.date.isBusy = [];
      this.submitDate(input);
      this.availability(this.availabilityTimes);
    }
  },

  computed: {
    allowedDates: () => moment().format("YYYY-MM-DD"),
    todaysDate: () => moment().format("MM/DD/YYYY"),

    ...mapState(["date"]),

    dateInput: {
      get() {
        return this.date.date;
      },
      set(date) {
        this.updateDate(date);
      }
    },
    userDate: {
      get() {
        return this.date.userDate;
      },
      set(userDate) {
        this.updateUserDate(userDate);
      }
    },
    dateMenu: {
      get() {
        return this.date.dateMenu;
      },
      set(dateMenu) {
        this.updateDateMenu(dateMenu);
      }
    }
  },

  async created() {
    try {
      await this.getBookDates();
    } catch (err) {
      console.log("error: " + err.message);
    }
  }
};
</script>

<style></style>
