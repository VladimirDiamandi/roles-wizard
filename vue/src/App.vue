<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// import ApolloExample from "./components/ApolloExample.vue";

export default Vue.extend({
  name: "App",

  // components: {
  //   ApolloExample
  // },

  data: () => ({
    //
  })
});
</script>
