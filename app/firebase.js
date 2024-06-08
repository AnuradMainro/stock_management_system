// firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_Jtdm08obWym6R4xeCsak8f47sjkvsgY",
  authDomain: "cprg306-assignments-b5c1e.firebaseapp.com",
  projectId: "cprg306-assignments-b5c1e",
  storageBucket: "cprg306-assignments-b5c1e.appspot.com",
  messagingSenderId: "125170952702",
  appId: "1:125170952702:web:e84924b4e74436549b78af"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
