
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCk0tlUnljE-35kZe6OVZ7p4eoPaxt9Bwo",
  authDomain: "miniblog-b0df3.firebaseapp.com",
  projectId: "miniblog-b0df3",
  storageBucket: "miniblog-b0df3.appspot.com",
  messagingSenderId: "1055650139614",
  appId: "1:1055650139614:web:25ffa033a888f3eecee14f"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}

