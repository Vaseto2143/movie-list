import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAgmCjIIM7O35fcil78Opz2Sejh2gU8Ne0",
    authDomain: "movie-lists-2b85d.firebaseapp.com",
    databaseURL: "https://movie-lists-2b85d.firebaseio.com",
    projectId: "movie-lists-2b85d",
    storageBucket: "movie-lists-2b85d.appspot.com",
    messagingSenderId: "567134302010",
    appId: "1:567134302010:web:bfbaabb4628a6e97eeaa03",
    measurementId: "G-622RN59EEH"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;