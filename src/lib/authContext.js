"use client"
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup,onAuthStateChanged,GoogleAuthProvider,signOut,getAuth} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const app = getAuth()

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const googleLogOut = () => {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //console.log("Apps",currentUser.uid)
        localStorage.setItem("authToken", currentUser.uid);
      }else {
        localStorage.removeItem("authToken");
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user,app]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, googleLogOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};