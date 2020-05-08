<template>
  <div class="home">
    <!--Landing Section-->
    <v-container class="fill-height background-logo" fluid>
      <v-row class="fill-height" no-gutters align="center" justify="space-around">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="header-title text-center">
              <v-row align="center" justify="center">
                <v-col cols="12" md="12">Modify,</v-col>
                <v-col cols="12" md="12">Modularize</v-col>
                <v-col cols="12" md="12">& Modernize Co.</v-col>
              </v-row>
            </h1>
          </v-col>

          <v-col md="12">
            <v-img class="mx-auto" max-width="130" src="../assets/Images/background-logo.png"></v-img>
          </v-col>

          <v-col cols="12">
            <h1 class="header-body text-center">We are here to help your business</h1>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col class="text-center pa-2" cols="6">
            <BookUs />
          </v-col>

          <v-col class="text-center pa-2" cols="6">
            <ContactUs />
          </v-col>
        </v-row>
      </v-row>
    </v-container>

    <!--Card Section-->
    <v-container fluid class="fill-height">
      <v-row align-content="center" justify="center" align="center">
        <v-col cols="12" class="text-center">
          <h1 class="services-title mb-5">Services</h1>
          <h3 class="services-text">
            From custom software solutions, to offering a helping hand with
            operations, we got you covered.
          </h3>
        </v-col>

        <v-col cols="12" sm="6" md="6" lg="3" v-for="(service, index) in services" :key="index">
          <ServiceCard :service="service" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServiceCard from "@/components/ServiceCard.vue";
import ContactUs from "@/components/ContactUs.vue";
import BookUs from "@/components/BookUs.vue";
import mod3Services from "../data/mod3Services";

export default {
  name: "Home",
  components: {
    ServiceCard,
    ContactUs,
    BookUs
  },
  data() {
    return {
      services: mod3Services
    };
  }
};
</script>

<style lang="scss">
//Hero Section
.background-logo {
  background-color: #3f51b5;
}

//Hero Title
.header-title {
  font-size: 4vw;
  text-transform: uppercase;
  color: white;
}

//Hero Body Text
.header-body {
  font-size: 4vw;
  color: lightgray;
  font-style: italic;
}

//Services Title
.services-title {
  font-size: 3vw;
  text-transform: uppercase;
}

//Services Text
.services-text {
  font-size: 3.5vh;
}

/*=================================
------RESPONSIVE BREAK POINTS------
@media (min-width: 640px){}
 
@media (min-width: 768px){}
 
@media (min-width: 1024px){}
 
@media (min-width: 1200px){}
===================================*/

@media (max-width: 786px) {
  //Hero Title
  .header-title {
    font-size: 4vh;
  }

  //Hero Body Text
  .header-body {
    font-size: 5vh;
  }

  //Services Title
  .services-title {
    font-size: 3vh;
  }

  //Services Text
  .services-text {
    font-size: 3.5vh;
  }
}
</style>
