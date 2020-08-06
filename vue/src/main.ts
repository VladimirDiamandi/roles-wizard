import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueApollo from "vue-apollo";
import { apolloClient } from "@/utils/graphql.client";

Vue.use(VueApollo);
Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  router,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
