import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  connectAuthEmulator,
} from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


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

export const db = getFirestore();

if (process.env.NODE_ENV != 'production') {
  console.warn('ENABLING EMULATOR');
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8081);

  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LeOXQcfAAAAAMLK8e2jx0wTw6l1SLjxr9XXf9ko'),
  isTokenAutoRefreshEnabled: true
});

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
