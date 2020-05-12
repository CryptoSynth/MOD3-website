<template>
  <div>
    <v-dialog class="dialog-size" dark v-model="bookMenu" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn large min-width="130" max-width="180" v-on="on" light outlined color="white">Book Us</v-btn>
      </template>

      <v-card light>
        <v-card-title>Book Us</v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-form ref="book" v-model="valid">
            <v-container fluid>
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <v-text-field
                    required
                    :rules="emailRules"
                    color="indigo"
                    outlined
                    placeholder="email@example.com"
                    label="Email"
                    v-model="email"
                  ></v-text-field>
                </v-col>

                <DatePicker :availabilityTimes="availabilityTimes" />

                <StartTimePicker />

                <EndTimePicker />

                <v-row align="center" justify="center" no-gutters>
                  <v-col cols="12">
                    <h3 class="mb-3">Availibility:</h3>
                    <span v-for="(available, index) in availabilityTimes" :key="available">
                      <v-chip
                        small
                        class="ma-2"
                        :color="date.isBusy[index] ? 'red' : 'green'"
                        text-color="white"
                      >
                        <v-avatar left>
                          <v-icon v-if="date.isBusy[index]" small>mdi-close-circle</v-icon>
                          <v-icon v-else small>mdi-check-circle</v-icon>
                        </v-avatar>
                        {{available}}
                      </v-chip>
                    </span>
                  </v-col>
                </v-row>

                <v-spacer></v-spacer>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined dark color="red" rounded @click="close">cancel</v-btn>
          <v-btn :dark="valid" color="indigo" rounded :disabled="!valid" @click="postBook">submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker.vue";
import StartTimePicker from "@/components/StartTimePicker.vue";
import EndTimePicker from "@/components/EndTimePicker.vue";
import moment from "moment";

import { mapState, mapActions } from "vuex";

export default {
  name: "book-us",
  components: {
    DatePicker,
    StartTimePicker,
    EndTimePicker
  },
  data() {
    return {
      times: [],
      availabilityTimes: [],
      emailRules: [
        v => !!v || "Email is required",
        v =>
          /^(\s{0,5}[a-zA-Z0-9._-]{2,})@([a-zA-Z0-9]{2,})\.([a-zA-Z]{2,}\s{0,5})$/.test(
            v
          ) || "Not a valid email",
        v => (v && v.length <= 50) || "Exceeded letter\\number count!"
      ]
    };
  },

  methods: {
    ...mapActions("book", [
      "createBook",
      "getBooks",
      "updateBookMenu",
      "updateValid",
      "updateEmail",
      "close"
    ]),

    timeRange() {
      for (let i = 1; i <= 24; i++) {
        this.times.push(moment(i, "H").format("hh:mm A"));
      }

      let rangeTimes = [...this.times];

      for (let i = 0; i < this.times.length / 2; i++) {
        const range = rangeTimes.splice(0, 2).join(" - ");
        rangeTimes.push(range);
      }

      rangeTimes.forEach(time => {
        this.availabilityTimes.push(time);
      });
    },

    formatTime: time => moment(time).format("h:mm A"),

    async postBook() {
      this.$refs.book.validate();

      const book = {
        email: this.email,
        date: moment(this.date.date, "MM/DD/YYYY").format("YYYY-MM-DD"),
        startTime: moment(this.time.startTime, "hh:mm A")
          .toDate()
          .getTime(),
        endTime: moment(this.time.endTime, "hh:mm A")
          .toDate()
          .getTime()
      };

      try {
        await this.createBook(book);
        this.$swal({
          text: `We will see you on ${moment(book.date).format(
            "MM/DD/YYYY"
          )} @ ${moment(book.startTime).format("h:mm A")} - ${moment(
            book.endTime
          ).format("h:mm A")}`,
          showCloseButton: false,
          showConfirmButton: false,
          icon: "success",
          timer: 4000,
          timerProgressBar: true
        });
      } catch (err) {
        this.$swal({
          text: `${err.response.data}`,
          showCloseButton: false,
          showConfirmButton: false,
          timerProgressBar: true,
          icon: "error",
          timer: 4000
        });
      }
    }
  },

  computed: {
    ...mapState(["book", "date", "time"]),

    bookMenu: {
      get() {
        return this.book.bookMenu;
      },
      set(bookMenu) {
        this.updateBookMenu(bookMenu);
      }
    },
    valid: {
      get() {
        return this.book.valid;
      },
      set(valid) {
        this.updateValid(valid);
      }
    },
    email: {
      get() {
        return this.book.email;
      },
      set(email) {
        this.updateEmail(email);
      }
    }
  },

  async created() {
    this.timeRange();
    try {
      await this.getBooks();
    } catch (err) {
      console.log("error: " + err.message);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
