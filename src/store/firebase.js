import * as firebase from "firebase/app";
// Required for side-effects
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
//IMPORT: Firebase Storage for Image Upload
import "firebase/storage";

// initialize firebase, this is directly from the firebase documentation
// regarding getting started for the web
//
//https://firebase.google.com/docs/web/setup?authuser=0

//CHECK FOR MULTIPLE INSTANCES OF FIREBASE
if (firebase.default.apps.length === 0) {
  firebase.default.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
  });
}

export const firebaseAuth = firebase.default.auth();
export const firebaseApp = firebase.default;
export const firebaseStorage = firebase.default.storage;
