<template>
  <div>
    <v-dialog dark v-model="bookUsMenu" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" dark rounded color="indigo">Book Us</v-btn>
      </template>

      <v-card light>
        <v-card-title>Book Us</v-card-title>

        <v-divider></v-divider>
        <v-card-text>
          <DatePicker />
          <TimePicker />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined dark color="red" rounded @click="close">cancel</v-btn>
          <v-btn dark color="indigo" rounded>submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker.vue";
import TimePicker from "@/components/TimePicker.vue";
export default {
  name: "book-us",
  components: {
    DatePicker,
    TimePicker
  },
  data() {
    return {
      popout: false,
      hover: false,
      bookUsMenu: false
    };
  },
  methods: {
    close() {
      this.bookUsMenu = false;
    }
  }
};
</script>

<style>
</style>