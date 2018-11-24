import Vue from "vue";
import firebase from "firebase";
// Vue.use(VueFire);

const config = {
  apiKey: "AIzaSyA3B26AekqhQIUyDYe1KuJZjIUbU8dgJwY",
  authDomain: "testtask-e8669.firebaseapp.com",
  databaseURL: "https://testtask-e8669.firebaseio.com",
  projectId: "testtask-e8669",
  storageBucket: "",
  messagingSenderId: "481022822477"
};

firebase.initializeApp(config);
const db = firebase.database();

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export { db, firebase }
