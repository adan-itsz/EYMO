import * as firebase from 'firebase'
export var config = {
    apiKey: "AIzaSyDy-4SzspXdSO8lMgao4VY22xjXhGtlYOE",
    authDomain: "eymo-91ecd.firebaseapp.com",
    databaseURL: "https://eymo-91ecd.firebaseio.com/",
    projectId: "eymo-91ecd",
    storageBucket: "eymo-91ecd.appspot.com",
  };

  firebase.initializeApp(config);

  export const ref = firebase.database().ref();
  export const firebaseAuth = firebase.auth();
