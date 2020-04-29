<template>
  <div class="home">
    <!--Landing Section-->
    <v-parallax height="700" class="parallax-height" src="@/assets/Images/mod-3-logo.jpeg">
      <v-overlay z-index="-1" class="overlay" :absolute="true" opacity=".3"></v-overlay>
      <v-row no-gutters align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="header-title text-center">
            <v-row align="center" justify="center">
              <v-col cols="12" md="12">Modify,</v-col>
              <v-col cols="12" md="12">Modularize</v-col>
              <v-col cols="12" md="12">& Modernize Co.</v-col>
            </v-row>
          </h1>
        </v-col>

        <v-col cols="12">
          <h1 class="header-body text-center">We are here to help your business.</h1>
        </v-col>

        <v-row>
          <v-col class="text-center pa-2" cols="12">
            <BookUs />
          </v-col>
          <v-col class="text-center pa-2" cols="12">
            <ContactUs />
          </v-col>
        </v-row>
      </v-row>
    </v-parallax>

    <!--Card Section-->
    <v-container class="card-background" fluid>
      <v-row align-content="center" no-gutters justify="center" align="center">
        <v-col cols="12" class="text-center">
          <h1 class="services-title mb-5">Services</h1>
          <h3 class="services-text mb-5">
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
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
//Hero Section
.parallax-height {
}

//Hero Title
.header-title {
  font-size: 3vw;
  text-transform: uppercase;
}

.title-text {
  padding: 0.8rem 0rem;
}

//Hero Body Text
.header-body {
  font-size: 4vw;
}

//Services Section
.card-background {
}

//Services Title
.services-title {
  font-size: 3vw;
  text-transform: uppercase;
}

//Services Text
.services-text {
  font-size: 2.2vw;
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
    font-size: 5vh;
  }

  //Hero Body Text
  .header-body {
    font-size: 4vh;
  }

  //Services Title
  .services-title {
    font-size: 5vh;
  }

  //Services Text
  .services-text {
    font-size: 3.5vh;
  }
}
</style>
