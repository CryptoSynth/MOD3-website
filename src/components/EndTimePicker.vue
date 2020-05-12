<template>
  <v-dialog
    v-model="timeMenuEnd"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="endTime"
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
      v-model="timeEnd"
      :allowed-minutes="allowedStep"
      @click:minute="submitEndTime"
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
    ...mapActions("time", [
      "submitEndTime",
      "updateTimeEnd",
      "updateEndTime",
      "updateTimeMenuEnd"
    ])
  },

  computed: {
    ...mapState(["time"]),

    timeEnd: {
      get() {
        return this.time.timeEnd;
      },
      set(timeEnd) {
        this.updateTimeEnd(timeEnd);
      }
    },

    endTime: {
      get() {
        return this.time.endTime;
      },
      set(endTime) {
        this.updateEndTime(endTime);
      }
    },

    timeMenuEnd: {
      get() {
        return this.time.timeMenuEnd;
      },
      set(timeMenuEnd) {
        this.updateTimeMenuEnd(timeMenuEnd);
      }
    }
  }
};
</script>

<style></style>
