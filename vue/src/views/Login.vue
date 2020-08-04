<template>
  <v-container>
    <ApolloMutation
      :mutation="require('../graphql/Login.gql')"
      :variables="{
        email,
        password
      }"
      class="form"
      @done="handleLogin"
    ><template slot-scope="{ mutate }">
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn color="success" @click="mutate()">Login</v-btn>
    </template>
    </ApolloMutation>
  </v-container>
</template>

<script>
import _ from "lodash";
import router from "@/router";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin(data) {
      this.email = "";
      this.password = "";
      const token = _.get(data, "data.login.token");
      console.log('ROUTER', router);
      if (token) {
        window.localStorage.setItem("token", token);
        router.push({name: "Home"});
      }
    }
  }
};
</script>
