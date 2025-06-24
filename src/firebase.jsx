import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMlEnfSWcOkESHlubgcZ11zcA-AxpzLRY",
  authDomain: "taskmate-41630.firebaseapp.com",
  projectId: "taskmate-41630",
  storageBucket: "taskmate-41630.firebasestorage.app",
  messagingSenderId: "221963760002",
  appId: "1:221963760002:web:8d6f713d797105e2925f9b",
  measurementId: "G-KY5NY99T6P",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
