import { initializeApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth"
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp)

export async function getAuthenticatedAppForUser(session = null) {
    if (typeof window !== "undefined") {
      // client
      console.log("client: ", firebaseApp);
  
      return { app: firebaseApp, user: auth.currentUser.toJSON() };
    }
    return {app: null, user: null}
  }
  //const analytics = getAnalytics(app);
  
export const app = firebaseApp
