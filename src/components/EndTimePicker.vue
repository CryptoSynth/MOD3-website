<template>
  <v-dialog
    v-model="timeMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-col cols="12" md="6">
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
      @click:minute="submitTime"
      color="indigo"
      header-color="indigo"
      format="ampm"
      ampm-in-title
    ></v-time-picker>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "end-time-picker",

  data() {
    return {
      endRules: [v => !!v || "End Time is required"]
    };
  },

  methods: {
    allowedStep: m => m % 30 === 0,
    ...mapActions("book", [
      "submitTime",
      "updateTime",
      "updateUserTime",
      "updateTimeMenu"
    ])
  },

  computed: {
    ...mapState(["book"]),
    time: {
      get() {
        return this.book.time;
      },
      set(time) {
        this.updateTime(time);
      }
    },

    userTime: {
      get() {
        return this.book.userTime;
      },
      set(userTime) {
        this.updateUserTime(userTime);
      }
    },

    timeMenu: {
      get() {
        return this.book.timeMenu;
      },
      set(timeMenu) {
        this.updateTimeMenu(timeMenu);
      }
    }
  }
};
</script>

<style></style>
