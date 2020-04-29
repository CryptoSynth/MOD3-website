<template>
  <v-container pb-0 px-0 pt-5 fluid>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="11">
        <v-menu
          v-model="datePickerMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              color="indigo"
              outlined
              v-model="dateFormatted"
              label="Date:"
              append-icon="mdi-calendar-edit"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker color="indigo" header-color="indigo" v-model="date">
            <v-spacer></v-spacer>
            <v-btn text color="indigo" @click="close">Cancel</v-btn>
            <v-btn text color="indigo" @click="close">Ok</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "date-picker",

  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    datePickerMenu: false
  }),
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    close() {
      this.datePickerMenu = false;
    }
  },
  watch: {
    //change to computed property
    date() {
      this.dateFormatted = this.formatDate(this.date);
    }
  }
};
</script>

<style>
</style>