import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {initializeApp} from "firebase/app"


const firebaseConfig = {

    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "verifynow-5a696.firebaseapp.com",
    projectId: "verifynow-5a696",
    storageBucket: "verifynow-5a696.appspot.com",
    messagingSenderId: "471013231288",
    appId: "1:471013231288:web:69c501e748a1b2de51024d",
    measurementId: "G-V6XX2KYBCY"
  };

  // initialize Firebase

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  export {auth, provider}