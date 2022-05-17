// const obj = {
// 	"coordinates": [
// 		[-84.2876697, 33.8955146],
// 		[-84.226134, 33.889239],
// 	],
// 	"extra_info": [
// 		"suitability",
// 		"steepness",
// 		"surface",
// 		"waycategory",
// 		"waytype",
// 		"tollways",
// 		"traildifficulty",
// 		"osmid",
// 		"roadaccessrestrictions",
// 		"countryinfo",
// 		"blue",
// 		"noise",
// 	],
// 	"instructions": true,
// 	"instructions_format": "text",
// 	"options": { "vehicle_type": "hgv" },
// 	"preference": "recommended",
// 	"roundabout_exits": false,
// 	"suppress_warnings": true,
// 	"units": "mi",
// 	"geometry": true,
// };

// let newob = {
// 	weight: "234",
// 	rate: "23",
// 	tracking: false,
// 	active: true,
// 	equipment: {},
// 	route: {
// 		bbox: [-84.220442, 33.853172, -84.190108, 33.934537],
// 		type: "Feature",
// 		properties: {
// 			segments: [
// 				{
// 					distance: 7.973,
// 					duration: 1081.3,
// 					steps: [
// 						{
// 							distance: 0.011,
// 							duration: 6.2,
// 							type: 11,
// 							instruction: "Head south",
// 							name: "-",
// 							way_points: [0, 1],
// 						},
// 						{
// 							distance: 0.028,
// 							duration: 8,
// 							type: 1,
// 							instruction: "Turn right",
// 							name: "-",
// 							way_points: [1, 2],
// 						},
// 						{
// 							distance: 0.174,
// 							duration: 27.6,
// 							type: 1,
// 							instruction: "Turn right onto Main Street",
// 							name: "Main Street",
// 							way_points: [2, 10],
// 						},
// 						{
// 							distance: 0.063,
// 							duration: 12.2,
// 							type: 0,
// 							instruction: "Turn left onto Lavista Road, GA 236",
// 							name: "Lavista Road, GA 236",
// 							way_points: [10, 15],
// 						},
// 						{
// 							distance: 0.081,
// 							duration: 13.4,
// 							type: 1,
// 							instruction: "Turn right",
// 							name: "-",
// 							way_points: [15, 19],
// 						},
// 						{
// 							distance: 1.809,
// 							duration: 182.5,
// 							type: 5,
// 							instruction: "Turn slight right onto Chamblee Tucker Road",
// 							name: "Chamblee Tucker Road",
// 							way_points: [19, 84],
// 						},
// 						{
// 							distance: 0.224,
// 							duration: 26,
// 							type: 6,
// 							instruction: "Continue straight onto Tucker Norcross Road",
// 							name: "Tucker Norcross Road",
// 							way_points: [84, 103],
// 						},
// 						{
// 							distance: 1.61,
// 							duration: 177.1,
// 							type: 1,
// 							instruction: "Turn right onto Tucker Norcross Road",
// 							name: "Tucker Norcross Road",
// 							way_points: [103, 180],
// 						},
// 						{
// 							distance: 1.122,
// 							duration: 148.9,
// 							type: 0,
// 							instruction: "Turn left onto Jimmy Carter Boulevard",
// 							name: "Jimmy Carter Boulevard",
// 							way_points: [180, 232],
// 						},
// 						{
// 							distance: 1.207,
// 							duration: 146.3,
// 							type: 1,
// 							instruction: "Turn right onto Brook Hollow Parkway",
// 							name: "Brook Hollow Parkway",
// 							way_points: [232, 276],
// 						},
// 						{
// 							distance: 1.116,
// 							duration: 129.3,
// 							type: 0,
// 							instruction: "Turn left onto Mitchell Road Northwest",
// 							name: "Mitchell Road Northwest",
// 							way_points: [276, 323],
// 						},
// 						{
// 							distance: 0.139,
// 							duration: 53.7,
// 							type: 0,
// 							instruction: "Turn left onto Everglades Trail",
// 							name: "Everglades Trail",
// 							way_points: [323, 330],
// 						},
// 						{
// 							distance: 0.299,
// 							duration: 115.6,
// 							type: 0,
// 							instruction: "Turn left onto Marshes Glenn Drive Northwest",
// 							name: "Marshes Glenn Drive Northwest",
// 							way_points: [330, 342],
// 						},
// 						{
// 							distance: 0.056,
// 							duration: 21.7,
// 							type: 1,
// 							instruction: "Turn right onto Glenn Hollow Lane",
// 							name: "Glenn Hollow Lane",
// 							way_points: [342, 343],
// 						},
// 						{
// 							distance: 0.033,
// 							duration: 12.9,
// 							type: 0,
// 							instruction: "Turn left onto Marshes Glenn Court",
// 							name: "Marshes Glenn Court",
// 							way_points: [343, 344],
// 						},
// 						{
// 							distance: 0,
// 							duration: 0,
// 							type: 10,
// 							instruction: "Arrive at Marshes Glenn Court, on the left",
// 							name: "-",
// 							way_points: [344, 344],
// 						},
// 					],
// 				},
// 			],
// 			extras: {
// 				waycategory: {
// 					values: [[0, 344, 0]],
// 					summary: [
// 						{
// 							value: 0,
// 							distance: 8,
// 							amount: 100,
// 						},
// 					],
// 				},
// 				countryinfo: {
// 					values: [[0, 344, 214]],
// 					summary: [
// 						{
// 							value: 214,
// 							distance: 8,
// 							amount: 100,
// 						},
// 					],
// 				},
// 				surface: {
// 					values: [[0, 344, 1]],
// 					summary: [
// 						{
// 							value: 1,
// 							distance: 8,
// 							amount: 100,
// 						},
// 					],
// 				},
// 				waytypes: {
// 					values: [
// 						[0, 2, 3],
// 						[2, 180, 2],
// 						[180, 232, 1],
// 						[232, 323, 2],
// 						[323, 344, 3],
// 					],
// 					summary: [
// 						{
// 							value: 2,
// 							distance: 6.3,
// 							amount: 78.82,
// 						},
// 						{
// 							value: 1,
// 							distance: 1.1,
// 							amount: 14.08,
// 						},
// 						{
// 							value: 3,
// 							distance: 0.6,
// 							amount: 7.1,
// 						},
// 					],
// 				},
// 				steepness: {
// 					values: [
// 						[0, 274, 0],
// 						[274, 282, -2],
// 						[282, 344, 0],
// 					],
// 					summary: [
// 						{
// 							value: 0,
// 							distance: 7.7,
// 							amount: 97.05,
// 						},
// 						{
// 							value: -2,
// 							distance: 0.2,
// 							amount: 2.95,
// 						},
// 					],
// 				},
// 				suitability: {
// 					values: [
// 						[0, 2, 6],
// 						[2, 10, 7],
// 						[10, 232, 8],
// 						[232, 323, 7],
// 						[323, 344, 6],
// 					],
// 					summary: [
// 						{
// 							value: 8,
// 							distance: 4.9,
// 							amount: 61.58,
// 						},
// 						{
// 							value: 7,
// 							distance: 2.5,
// 							amount: 31.32,
// 						},
// 						{
// 							value: 6,
// 							distance: 0.6,
// 							amount: 7.1,
// 						},
// 					],
// 				},
// 				roadaccessrestrictions: {
// 					values: [[0, 344, 0]],
// 					summary: [
// 						{
// 							value: 0,
// 							distance: 8,
// 							amount: 100,
// 						},
// 					],
// 				},
// 				traildifficulty: {
// 					values: [[0, 344, 0]],
// 					summary: [
// 						{
// 							value: 0,
// 							distance: 8,
// 							amount: 100,
// 						},
// 					],
// 				},
// 				tollways: {
// 					values: [[0, 344, 0]],
// 					summary: [
// 						{
// 							value: 0,
// 							distance: 8,
// 							amount: 100,
// 						},
// 					],
// 				},
// 			},
// 			warnings: [
// 				{
// 					code: 4,
// 					message:
// 						"Extra info requested but not available:lightorange, noise, osmid",
// 				},
// 			],
// 			summary: {
// 				distance: 7.973,
// 				duration: 1081.3,
// 			},
// 			way_points: [0, 344],
// 		},
// 		geometry: {
// 			coordinates:
// 				"BFlhgiQig0uGId5CZpBqDboCBEPuBdsCNiBXiCbsCvBTfLVH9BbdPlBKrBMzBYrDoC3B8DduCXqDH6BDiBTiDZ8BPetB6BvB4BbuBb8BTgDBkCG0BcqDa0CKgB2BmFc0CUkCUmCcgDWmDCsBE6BF0DAMBqBBkCKgDESM0BQwBGWY8B6B6EY8BoDiIS8BK0BE4BF0CJ2BFQNqBb8BzB4CvD2FHURqBR8BJoCJ8CXkHXoHNwETqDd8ChBqDNmBT4BZuCPuBBIT-BXmCBIViCACRyBFWVmCBIPuBBER2BDMNeHOJSZiBlBmBAA4C2CEEmDiDkF-E8D4Daa2B0BUUGGoBwBGGmB4B2B6CuBiC2B2BeWkBWmCiB2EsCgFwCkCmB2EuC6CyBGCsCsBmDiC-D8C-CiC0BqBQM4BgCQaUsBImBESB2BDUBMJiBV6BtB2DN0BDiBDoBM6BgBgDMUYiBwBiCQUuB2BUaYesC-CkBmBgBkBiCsCIKgBkBIGwB2BYYwC4CgBqB6B-COaWmBiB8BOcKOKWUeUiBgB8BSeegBaWTyCHoBFcBOLyCN6CL8CH8BHqCHiCHkCFqBXwFP0DDYH0BH2BRqDZ0CdoCRuBDMlD8GXsCfgBbahBmBLaFUFWRuBPuBLaPsBDeCUAoBBGDMb8CJcBKrBmErBiEHUHYX2CLiBlB0DnB0DdqDJiBcIiCQyBKqBGkCEuBBYAqGFgDCGA8CKoCY0BiBkDkCyCyBkBUkDiBiCSyCY0EqBgEmB4DmBQEiBIoCK0BB0BBGA8K5B4BHuER2BDmCD4DGuCMyEwB2CkBuCqBqDuBuFsCmBQuFsCIEqJ-ENSpB0BVa7BoCFKVOnBYFGFE_CmCZYrCmC1BwBxF8ExE0EnC-CrDkElFgGtB2BjBiBvBiBdWjBUzDwBbO3CoB_BepDmCnCuCfoBhBuBtBoBlBmBhBuBZWJQnB4BpBuBnBmBVWnB-BZiEBKzB8CvB8Bdc5B2BRR5B1BnBlBpBbdNpBLpFjBgBhDiBjC4BvCmE7FSzBEfBrDFdPTVLZHlDJZiFzDL",
// 			type: "LineString",
// 		},
// 	},
// 	contact: {
// 		name: "Parth Patel",
// 		email: "parth.patel.r@gmail.com",
// 		number: "(404) 936-4497",
// 	},
// 	origin: [
// 		{
// 			location: {
// 				address_components: {
// 					streetnumber: "2343",
// 					street: "Main Street",
// 					city: "Tucker",
// 					state: "GA",
// 					country: "United States",
// 					postcode: "30084",
// 					postcode_suffix: "4471",
// 				},
// 				formatted_address: "2343 Main St, Tucker, GA 30084, USA",
// 				geometry: {
// 					location: {
// 						lat: 33.8535568,
// 						lng: -84.21417,
// 					},
// 					viewport: {
// 						south: 33.8521767697085,
// 						west: -84.21568008029149,
// 						north: 33.8548747302915,
// 						east: -84.21298211970849,
// 					},
// 				},
// 				name: "2343 Main St",
// 				place_id: "ChIJIcxNqDum9YgRC3_DA_FmJaY",
// 				url:
// 					"https://maps.google.com/?q=2343+Main+St,+Tucker,+GA+30084,+USA&ftid=0x88f5a63ba84dcc21:0xa62566f103c37f0b",
// 				utc_offset: -240,
// 				html_attributions: [],
// 				utc_offset_minutes: -240,
// 				lat: 33.8535568,
// 				lng: -84.21417,
// 			},
// 			date: "2022-04-25",
// 			time: null,
// 			ref: "2342309",
// 		},
// 	],
// 	destination: [
// 		{
// 			location: {
// 				address_components: {
// 					streetnumber: "2342",
// 					street: "Marshes Glenn Court",
// 					city: "Norcross",
// 					state: "GA",
// 					country: "United States",
// 					postcode: "30071",
// 					postcode_suffix: "3088",
// 				},
// 				formatted_address: "2342 Marshes Glenn Ct, Norcross, GA 30071, USA",
// 				geometry: {
// 					location: {
// 						lat: 33.9304486,
// 						lng: -84.20459609999999,
// 					},
// 					viewport: {
// 						south: 33.92925561970851,
// 						west: -84.20591133029151,
// 						north: 33.93195358029151,
// 						east: -84.20321336970851,
// 					},
// 				},
// 				name: "2342 Marshes Glenn Ct",
// 				place_id: "ChIJWUUr-kqh9YgRo7AOdevsuhI",
// 				url:
// 					"https://maps.google.com/?q=2342+Marshes+Glenn+Ct,+Norcross,+GA+30071,+USA&ftid=0x88f5a14afa2b4559:0x12baeceb750eb0a3",
// 				utc_offset: -240,
// 				html_attributions: [],
// 				utc_offset_minutes: -240,
// 				lat: 33.9304486,
// 				lng: -84.20459609999999,
// 			},
// 			time: null,
// 			date: "2022-04-27",
// 			ref: "2342309",
// 		},
// 	],
// 	type: "van",
// 	id: "2MgeFgDVFvp1UsnzhR5o",
// };


// const load = {
//   num: null,
//   driver: "",
//   rate: null,
//   ratecon: null,
//   type: null,
//   tracking: false,

//   contact: {
//     name: null,
//     email: null,
//     number: null,
//   },
//   origin: [
//     {
//       location: null,
//       address: null,
//       date: null,
//       time: null,
//       lumper: null,
//       detention: null,
//       layover: null,
//       ref: null,
//       notes: "",
//       bolnum: null,
//       sealnum: null,
//     },
//   ],
//   destination: [
//     {
//       location: null,
//       address: null,
//       date: null,
//       time: null,
//       lumper: null,
//       detention: null,
//       layover: null,
//       ref: null,
//       notes: "",
//       pod: null,
//     },
//   ],
// };

// //Upload , see later

// function uploadRateCon(file, id) {
//   var uploadTask = storageRef.child("ratecons/rivers.jpg").put(file);

//   // Register three observers:
//   // 1. 'state_changed' observer, called any time the state changes
//   // 2. Error observer, called on failure,
//   // 3. Completion observer, called on successful completion
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       // Observe state change events such as progress, pause, and resume
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log("Upload is " + progress + "% done");
//       switch (snapshot.state) {
//         case firebase.storage.TaskState.PAUSED: // or 'paused'
//           console.log("Upload is paused");
//           break;
//         case firebase.storage.TaskState.RUNNING: // or 'running'
//           console.log("Upload is running");
//           break;
//       }
//     },
//     (error) => {
//       // Handle unsuccessful uploads
//     },
//     () => {
//       // Handle successful uploads on complete
//       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//         firebase
//           .firestore()
//           .collection("users")
//           .doc(firebase.auth().currentUser.uid)
//           .collection("loads")
//           .doc(id)
//           .update({ "load.ratecon": downloadURL });
//         console.log("File available at", downloadURL);
//       });
//     }
//   );
// }

// const drivers = {
//   license: {
//     number: null,
//     url: null,
//     class: null,
//     expiration: null,
//   },
//   dob: null,
//   name: null,
//   address: null,
//   ssn: null,
//   check: {
//     background: null,
//     bg_url: null,
//     mvr: null,
//     mvr_url: null,
//     drug: null,
//     drug_url: null,
//   },work:{
//       history:{
          
//       }
//   },
//   company_id:null
// };

// emailRules: [
//   v => !!v || 'E-mail is required',
//   v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
// ]

// equipment:{
//   type:null,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
//   num:null,
//   mileage:null,
//   active:true,
//   year:null,
//   make:"",
//   model:'',
//   vin:'',
  
// }