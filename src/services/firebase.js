import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7MFm2Y_j8oKZvg14fTNXrSRX0OQ28EiQ",
  authDomain: "leftovers-77cec.firebaseapp.com",
  databaseURL: "https://leftovers-77cec-default-rtdb.firebaseio.com",
  projectId: "leftovers-77cec",
  storageBucket: "leftovers-77cec.appspot.com",
  messagingSenderId: "131445621682",
  appId: "1:131445621682:web:c404a72ebbfc0eba4bdaab"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;