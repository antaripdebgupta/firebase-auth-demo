"use client"
import React,{memo,useState,useCallback} from 'react'
import Link from 'next/link'
import { Form, Input, Button} from "antd";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import {FaRegUser, FaFacebook } from "react-icons/fa";

function page() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2 top-0 font-sans dark:bg-dark dark:text-white">
      <h1 className="text-3xl font-bold mb-2">Sing Up</h1>
      <Form className="taxt-bold w-96">

      <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
          ]}
        >
            <Input
              size="large"
              placeholder="Name"
              prefix={<FaRegUser />} 
              className="w-96 h-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> 
       </Form.Item>

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

        <Form.Item
          name="confirm"
          ependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The new password that you entered do not match!"
                  )
                );
              },
            }),
          ]}
        >
             <Input.Password
               placeholder="Re-Enter Password"
               prefix={<RiLockPasswordLine />}
               className="w-96 h-10"
               value={verifiedPassword}
               onChange={(e) => setVerifiedPassword(e.target.value)}
             />
         </Form.Item>

          <Form.Item>
              <Button ype="primary" htmlType="submit" className="w-96 h-10 mt-4 dark:bg-white">
                Sign Up
              </Button>
          </Form.Item>

      </Form>
      
      <p className="text-center mt-4 font-sans">
          You are alrady login?<Link href="/auth/login" rel="noopener noreferrer">Login</Link>
        </p>
        <div className="flex items-center justify-between">
          <hr className="bg-black w-12 mr-2" />
          <p className="font-normal">Or Sing in with</p>
          <hr className="bg-black w-12 ml-2"/>
        </div>
        <div className="flex justify-center mt-4 gap-8">
          <Button className=" w-44 h-10 dark:bg-white" icon={<FcGoogle/>}>Google</Button>
          <Button className="w-44 h-10 dark:bg-white" icon={<FaFacebook className="fill-blue-500"/>}>Facebook</Button>
        </div>

    </div>
  )
}

export default memo(page)