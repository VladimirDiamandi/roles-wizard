<template>
  <v-container>
  <ApolloMutation
    :mutation="require('@/graphql/Login.gql')"
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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import _ from "lodash";
import router from "@/router";

interface LoginResponse {
  error?: string;
  message?: string;
  data?: {
    login: {
      token: string;
    }
  }
}

@Component({
  
})
export default class Login extends Vue {
  private email = "";
  private password = "";

  public handleLogin(data: LoginResponse): void {
    this.email = "";
    this.password = "";
    const token = _.get(data, "data.login.token");
    if (token) {
      window.localStorage.setItem("token", token);
      router.push({name: "Home"});
    }
  }
}
</script>
