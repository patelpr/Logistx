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
			path: "/loads/view",
			name: "DriverLoad",
			component: () => import("../components/Loads/AddLoads"),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/loads/:id",
			name: "Load",
			component: () => import("@/components/Loads/SingleLoad"),
			props: true,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/loads",
			name: "loads",
			component: () => import("../components/Loads/ViewLoads"),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/drivers/:id",
			name: "DriverProfile",
			component: () => import("../components/Drivers/AddDriver"),
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
		// {
		// 	path: "drivers/application",
		// 	name: "Drivers Application",
		// 	component: () => import("../components/Drivers/DriverApplication"),
		// 	meta: {
		// 		requiresAuth: true,
		// 	},
		// },
		{
			path: "/drivers",
			name: "Drivers",
			component: () => import("../components/Drivers/ViewDrivers"),
			meta: {
				requiresAuth: true,
			},
		},
		// {
		// 	path: "/driver/:id",
		// 	name: "Driver",
		// 	component: () => import("../components/Drivers/SingleDriver"),
		// 	props: true,
		// 	meta: {
		// 		requiresAuth: true,
		// 	},
		// },
		{
			path: "/equipments",
			name: "Equipments",
			component: () => import("../components/Equipments/ViewEquipments"),
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
		{
			path: "/equipment/:id",
			name: "Equipment",
			component: () => import("../components/Equipments/SingleEquipment"),
			props: true,
			meta: {
				requiresAuth: true,
			},
		},
	],
});

// router.beforeEach((to, from, next) => {
// 	firebase.auth().onAuthStateChanged((userAuth) => {
// 		if (!userAuth && to.matched.some((record) => record.meta.requiresAuth)) {
// 			next({
// 				name: "Home",
// 			});
// 		} else if (userAuth) {
// 			if (to.matched.some((record) => record.meta.driver)) {
// 				firebase
// 					.firestore()
// 					.collection("roles")
// 					.doc(userAuth.uid)
// 					.get()
// 					.then((snapShot) => {
// 						if (snapShot.data().driver) {
// 							next({ name: "DriverLoad" });
// 						} else {
// 							next();
// 						}
// 					});
// 			} else {
// 				next();
// 			}
// 		} else {
// 			next({ name: "Home" });
// 		}
// 	});
// 	next();
// });

router.beforeEach(async (to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	if (requiresAuth && !(await firebase.getCurrentUser())) {
		next({ path: "/login" });
	} else {
		next();
	}
});

export default router;
