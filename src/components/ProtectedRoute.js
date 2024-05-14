"use client"
import { useRouter,usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const authToken = localStorage.getItem("authToken");
      setIsLoggedIn(!!authToken); 
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && !isLoggedIn) {
      router.push('/auth/login');
    }else {
      router.push(pathname)
    }

  }, [isClient, isLoggedIn, router, pathname]);

  return isClient && isLoggedIn ? children : null;
};

export default ProtectedRoute;
