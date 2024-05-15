"use client"
import React,{memo, useState, useCallback} from 'react'
import { sendPasswordResetEmail } from "firebase/auth"
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { Form, Input, Button, notification } from "antd";
import { MdOutlineEmail } from "react-icons/md";

function page(){
  const router = useRouter()
  const [email, setEmail] = useState("");

  const resetForm = useCallback(() => {
    setEmail("");
  }, []);

  const reset = async () => {
    try {
     await sendPasswordResetEmail(auth,email);
     resetForm();
     notification.success({
        message: "Success",
        description: "Send a reset link to your email.",
      });
     router.push('/auth/login')
    }catch {
        console.log("reset error");
    }
  }

  return (
    <div className="h-screen flex flex-col align-center items-center  gap-2 top-0 pt-36 font-sans dark:text-white dark:bg-dark">
      <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
      <Form className="text-bold w-96" onFinish={reset}>

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

          <Form.Item>
              <Button htmlType="submit" className="w-96 h-10 mt-4 dark:bg-white">
                Send Email
              </Button>
          </Form.Item>

      </Form> 
    </div>
  )
}

export default memo(page)