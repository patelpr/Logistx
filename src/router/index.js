import Vue from "vue";
import Router from "vue-router";

import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Dash"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/account",
      name: "Account",
      component: () => import("../views/Account"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login"),
    },{
      path: "/loads",
      name: "loads",
      component: () => import("../components/Loads/ViewLoads"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/load/:id",
      name: "Load",
      component: () => import("@/components/Loads/SingleLoad"),
      props: true,
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/loads/add",
      name: "Add Loads",
      component: () => import("../components/Loads/AddLoads"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/drivers",
      name: "Drivers",
      component: () => import("../components/Drivers/ViewDrivers"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/driver/:id",
      name: "Driver",
      component: () => import("../components/Drivers/SingleDriver"),
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/drivers/add",
      name: "Add Drivers",
      component: () => import("../components/Drivers/AddDriver"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "drivers/application",
      name: "Drivers Application",
      component: () => import("../components/Drivers/DriverApplication"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/equipments",
      name: "Equipments",
      component: () => import("../components/Equipments/ViewEquipments"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/Equipment/:id",
      name: "Equipment",
      component: () => import("../components/Equipments/SingleEquipment"),
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/equipments/add",
      name: "Add Equipments",
      component: () => import("../components/Equipments/AddEquipment"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    router.app.$gapi.isSignedIn().then((isSignedIn) => {
      if (isSignedIn) {
        next()
      } else {
        console.log('You must be logged in to see this page')
        next({
          path: '/login',
        })
      }
    })
  } else {
    next()
  }
})

export default router;
