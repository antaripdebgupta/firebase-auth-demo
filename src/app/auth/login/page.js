"use client"
import React,{memo,useState,useCallback, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useIfLoggedIn } from '@/hooks/useIfLoggedIn'
import { auth } from '@/lib/firebase'
import { UserAuth } from '@/lib/authContext'
import { Form, Input, Button, notification } from "antd";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

function page() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useIfLoggedIn();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
  const { user, googleSignIn} = UserAuth();
  const [loading, setLoading] = useState(true);

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  const singIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(email,password);
      //console.log("log",userCredential);
      const uuid = userCredential.user.uid;
      localStorage.setItem("authToken", uuid);
      resetForm();
      router.push("/")
    }catch(error){
      notification.error ({
        message: "Error",
        description: "Invalid Credentials or Network Issue",
      })
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
      router.push("/")
    } catch (error) {
      console.log('GoogleSignIn Error:',error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="h-screen flex flex-col align-center items-center  gap-2 top-0 pt-36 font-sans dark:text-white dark:bg-dark">
      <h1 className="text-3xl font-bold mb-2">Login</h1>
      <Form className="text-bold w-96" onFinish={singIn}>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Email"
            prefix={<MdOutlineEmail />}
            className="w-96 h-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />     
        </Form.Item>

        <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter a password!",
                },
              ]}
            > 
            <Input.Password
              placeholder="Password"
              prefix={<RiLockPasswordLine />}
              className="w-96 h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />             
        </Form.Item>

        <div>
          <Link href="/auth/reset" rel="preload">Forgot Password?</Link>
        </div>

          <Form.Item>
              <Button htmlType="submit" className="w-96 h-10 mt-4 dark:bg-white">
                Log In
              </Button>
          </Form.Item>

      </Form>
      
      <p className="text-center mt-4">
          First time here?<Link href="/auth/singup" rel="preload">Sing up</Link>
        </p>
        <div className="flex items-center justify-between">
          <hr className="bg-black w-12 mr-2" />
          <p className="font-normal">Or Sing in with</p>
          <hr className="bg-black w-12 ml-2"/>
        </div>
        <div className="flex justify-center mt-4 gap-8">
          <Button className=" w-44 h-10 dark:bg-white" icon={<FcGoogle/>} onClick={handleGoogleSignIn}>Google</Button>
          <Button className="w-44 h-10 dark:bg-white" icon={<FaFacebook className="fill-blue-500"/>}>Facebook</Button>
        </div>
        <p className='mt-4 mr-40'><Link href="/auth/phone" rel="preload">Sing in with phone number -</Link></p>
    </div>
  )
}

export default memo(page)