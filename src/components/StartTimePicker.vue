<template>
  <v-dialog
    v-model="timeMenuStart"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-wdth="290px"
  >
    <template v-slot:activator="{ on }">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="startTime"
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
      v-model="timeStart"
      :allowed-minutes="allowedStep"
      @click:minute="submitStartTime"
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
  name: "start-time-picker",
  data() {
    return {
      startRules: [v => !!v || "Start Time is required"]
    };
  },
  methods: {
    allowedStep: m => m % 30 === 0,
    ...mapActions("time", [
      "submitStartTime",
      "updateTimeStart",
      "updateStartTime",
      "updateTimeMenuStart"
    ])
  },

  computed: {
    ...mapState(["time"]),

    timeStart: {
      get() {
        return this.time.timeStart;
      },
      set(timeStart) {
        this.updateTimeStart(timeStart);
      }
    },

    startTime: {
      get() {
        return this.time.startTime;
      },
      set(startTime) {
        this.updateStartTime(startTime);
      }
    },

    timeMenuStart: {
      get() {
        return this.time.timeMenuStart;
      },
      set(timeMenuStart) {
        this.updateTimeMenuStart(timeMenuStart);
      }
    }
  }
};
</script>

<style></style>
