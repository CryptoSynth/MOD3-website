<template>
  <div>
    <v-dialog class="dialog-size" dark v-model="bookUsMenu" persistent max-width="600px">
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
                <DatePicker
                  @reset="reset"
                  @booksSent="getBooks"
                  :events="events"
                  @dateSent="getDate"
                />
                <StartTimePicker @startTimeSent="getStartTime" />
                <EndTimePicker @endTimeSent="getEndTime" />
                <v-col cols="12" md="8">
                  <h3 class="mb-3">Availibility:</h3>
                  <span v-for="(book, index) in books" :key="book[index]">
                    <v-chip v-if="books" class="ma-2" color="red" text-color="white">
                      <v-avatar left>
                        <v-icon>mdi-close-circle</v-icon>
                      </v-avatar>
                      {{formatTime(book.startTime)}} - {{formatTime(book.endTime)}}
                    </v-chip>
                  </span>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined dark color="red" rounded @click="close">cancel</v-btn>
          <v-btn :dark="valid" color="indigo" rounded :disabled="!valid" @click="submit">submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker.vue";
import StartTimePicker from "@/components/StartTimePicker.vue";
import EndTimePicker from "@/components/EndTimePicker.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "book-us",
  components: {
    DatePicker,
    StartTimePicker,
    EndTimePicker
  },
  data() {
    return {
      //add avaiable times, create a function with time ranges, use logic to strikethrough already shceduled times
      email: "",
      date: "",
      startTime: "",
      endTime: "",
      events: [],
      books: [],
      emailRules: [
        v => !!v || "Email is required",
        v =>
          /^(\s{0,5}[a-zA-Z0-9._-]{2,})@([a-zA-Z0-9]{2,})\.([a-zA-Z]{2,}\s{0,5})$/.test(
            v
          ) || "Not a valid email",
        v => (v && v.length <= 50) || "Exceeded letter\\number count!"
      ],
      valid: true,
      bookUsMenu: false
    };
  },
  methods: {
    submit() {
      this.$refs.book.validate();
      axios
        .post("https://mod3-server.herokuapp.com/books/add", {
          email: this.email,
          date: this.date,
          startTime: moment(
            moment(this.startTime, "HH:mm A").format("HH:mm"),
            "HH:mm"
          )
            .toDate()
            .getTime(),
          endTime: moment(
            moment(this.endTime, "HH:mm A").format("HH:mm"),
            "HH:mm"
          )
            .toDate()
            .getTime()
        })
        .then(res => {
          const { date, startTime, endTime } = res.data;

          this.$swal({
            text: `We will see you on ${moment(date).format(
              "MM/DD/YYYY"
            )} @ ${moment(startTime).format("h:mm A")} - ${moment(
              endTime
            ).format("h:mm A")}`,
            showCloseButton: false,
            showConfirmButton: false,
            icon: "success",
            timer: 4000,
            timerProgressBar: true
          });

          this.close();
        })
        .catch(err => {
          this.$swal({
            text: `${err.response.data}`,
            showCloseButton: false,
            showConfirmButton: false,
            timerProgressBar: true,
            icon: "error",
            timer: 4000
          });
        });
    },
    reset() {
      this.books = [];
    },
    close() {
      this.$refs.book.reset();
      this.bookUsMenu = false;
    },
    getDate(date) {
      this.date = date;
    },
    getStartTime(start) {
      this.startTime = start;
    },
    getEndTime(end) {
      this.endTime = end;
    },
    getBooks(books) {
      this.books.push(books);
    },
    formatTime(time) {
      const timeFormatted = moment(time).format("h:mm A");
      return timeFormatted;
    },
    formatDate(date) {
      const timeFormatted = moment(date, "YYYY-MM-DD").format("MM/DD/YYYY");
      return timeFormatted;
    }
  },
  mounted() {
    axios
      .get("https://mod3-server.herokuapp.com/books/")
      .then(res => {
        this.events = res.data;
      })
      .catch(err => {
        alert(err.message);
      });
  }
};
</script>

<style scoped lang="scss">
</style>
