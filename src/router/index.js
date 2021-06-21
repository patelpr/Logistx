import Vue from "vue";
import Router from "vue-router";

import firebase from "firebase";
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Dash"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login"),
    },
    //Loads
    {
      path: "/loads",
      name: "loads",
      component: () => import("@/views/Loads"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/load/:id",
      name: "Load",
      component: () => import("@/components/Loads/Load"),
      props: true,
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/loads/add",
      name: "Add Loads",
      component: () => import("@/components/Loads/AddLoads.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/drivers",
      name: "Drivers",
      component: () => import("@/views/Drivers"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/driver/:id",
      name: "Driver",
      component: () => import("@/components/Drivers/Driver"),
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/drivers/add",
      name: "Add Drivers",
      component: () => import("../components/Drivers/AddDriver.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "drivers/application",
      name: "Drivers Application",
      component: () => import("@/components/Drivers/DriverApp.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/equipments",
      name: "Equipment",
      component: () => import("@/views/Equipments"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/Equipment/:id",
      name: "Equipment",
      component: () => import("@/components/Equipments/Equipment"),
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/equipments/add",
      name: "Add Equipments",
      component: () => import("@/components/Equipments/AddEquipment.vue"),
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
