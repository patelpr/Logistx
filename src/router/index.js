import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Map from "@/views/Map";
import Loads from "@/views/Loads";
import Drivers from "@/views/Drivers";
import Equipment from "@/views/Equipment";
import AddLoads from "../components/Loads/AddLoads";
import DriverApp from "..//components/Drivers/DriverApp.vue";

import Load from "../components/Loads/Load";

import firebase from "firebase";
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/loads",
      name: "loads",
      component: Loads,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/map",
      name: "map",
      component: Map,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/addloads",
      name: "Add Loads",
      component: AddLoads,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/application",
      name: "Application",
      component: DriverApp,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/load/:id",
      name: " Load",
      component: Load,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/drivers",
      name: "Drivers",
      component: Drivers,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/equipment",
      name: "Equipment",
      component: Equipment,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next("login");
  } else {
    next();
  }
});
export default router;
