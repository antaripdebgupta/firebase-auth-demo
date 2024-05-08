import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export const useIfLoggedIn = () => {
  const router = useRouter();
  useEffect(() => {
    const uuid = localStorage.getItem("authToken");
    if(uuid){
        router.push("/")
    }
  },[])
}
