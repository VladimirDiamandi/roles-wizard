import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/home/home";
import Login from "../views/login/login.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem("token");
  const auth = !!token;
  if (!auth && to.name !== "Login") {
    next({
      name: "Login"
    });
  } else {
    next();
  }
});

export default router;
