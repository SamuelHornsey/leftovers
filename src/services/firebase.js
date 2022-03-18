import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  connectAuthEmulator,
} from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7MFm2Y_j8oKZvg14fTNXrSRX0OQ28EiQ",
  authDomain: "leftovers-77cec.firebaseapp.com",
  databaseURL: "https://leftovers-77cec-default-rtdb.firebaseio.com",
  projectId: "leftovers-77cec",
  storageBucket: "leftovers-77cec.appspot.com",
  messagingSenderId: "131445621682",
  appId: "1:131445621682:web:c404a72ebbfc0eba4bdaab",
};

const app = initializeApp(firebaseConfig);

export const functions = getFunctions(app);

export const auth = getAuth(app);

if (process.env.NODE_ENV != 'production') {
  console.warn('ENABLING EMULATOR');
  connectFunctionsEmulator(functions, "http://localhost:5001");
  connectAuthEmulator(auth, "http://localhost:9099");
}

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
