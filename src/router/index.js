import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Loads from "@/views/Loads";
import Drivers from "@/views/Drivers";
import Equipment from "@/views/Equipment";
import AddLoads from '../components/AddLoads'

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
      path: "/addloads",
      name: "Add Loads",
      component: AddLoads,
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
