import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAF_LvwCt6Jp4uIfdrytmxQYo_15a5Qk-Q",
  authDomain: "undecided-9fb75.firebaseapp.com",
  databaseURL: "https://undecided-9fb75.firebaseio.com",
  projectId: "undecided-9fb75",
  storageBucket: "undecided-9fb75.appspot.com",
  messagingSenderId: "551297185325"
}

firebase.initializeApp(config)

const database = firebase.database();
export { firebase, database }
