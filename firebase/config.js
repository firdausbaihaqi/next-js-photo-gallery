import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MSRMNT_ID,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app)
const timestamp = serverTimestamp()

export { storage, db, timestamp };

