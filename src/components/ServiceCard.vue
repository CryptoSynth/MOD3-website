<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      dark
      color="indigo"
      class="text-center"
      :class="{ 'on-hover': hover }"
      :elevation="hover ? 15 : 5"
    >
      <v-row no-gutters align="center">
        <v-col cols="12">
          <v-img height="300px" :src="require(`@/assets/Images/${service.image}`)"></v-img>
        </v-col>
        <p>{{ elevated }}</p>
        <v-col cols="12">
          <v-card-title class="text-uppercase justify-center">{{ service.title }}</v-card-title>
          <v-card-subtitle class="text-capitalize mt-3">
            {{
            service.subtitle
            }}
          </v-card-subtitle>
          <v-card-text class="text-body text-justify">{{ service.text }}</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "service-card",
  props: ["service", "elevated"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.text-body {
  height: 150px;
  font-size: 1rem;
}

.v-card {
  overflow: hidden;
  transition: 0.4s ease-in-out;
}

.v-card.on-hover {
  transform: scale(1);
  transition: 0.4s ease-in;
  z-index: 5;
}
.v-card:not(.on-hover) {
  transform: scale(0.9);
  transition: 0.4s ease-out;
}

/*=================================
------RESPONSIVE BREAK POINTS------
@media (min-width: 640px){}
 
@media (min-width: 768px){}
 
@media (min-width: 1024px){}
 
@media (min-width: 1200px){}
===================================*/

@media (max-width: 786px) {
  //Service Card Text
  .text-body {
    font-size: 0.8rem;
  }
}
</style>
