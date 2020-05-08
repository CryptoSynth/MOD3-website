<template>
  <v-app>
    <!--Global Nav Menu-->

    <!--Global Body-->
    <v-content>
      <BaseNavBar />

      <router-view></router-view>
    </v-content>

    <!--Global Footer-->
    <v-footer dark color="indigo">
      <v-row class="py-5" justify="center" align="center" no-gutters>
        <v-col class="text-center" cols="12">
          <strong>
            {{ new Date().getFullYear() }} — &copy; Copyright 2020 MOD3 - All
            Rights Reserved
          </strong>
        </v-col>
        <v-col class="text-center mt-4" cols="12">
          <v-btn outlined dark>
            <v-icon left>mdi-phone</v-icon>833-696-3825
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
.v-dialog {
  margin: 0.5rem !important;
}
</style>
