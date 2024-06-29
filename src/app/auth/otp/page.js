"use client"
import React,{ memo, useState, useEffect} from 'react'
import { signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Form, Input, Button, notification } from "antd";

const page = () => {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [showSend, setShowSend] = useState(true);
  const [showVerify, setShowVerify] = useState(false);

  const sendOtp = async () => {
    if (!phone) {
      notification.warning({
        message: "Please enter your phone number before sending OTP",
      });
      return;
    }

    try {
      const recap = new RecaptchaVerifier(auth, "recap", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recap);
      setConfirmationResult(confirmation);
      setShowSend(false);
      setShowVerify(true);

    } catch (error) {
      console.log("Error sending otp", error);
    }
  };

  const verifyOtp = async() => {
    
  }

  return (
    <div className="h-screen flex flex-col align-center items-center gap-2 top-0 pt-36 font-sans dark:text-white">
      {showSend && (
      <Form onFinish={sendOtp}>
        <h1 className="text-2xl font-bold mb-2">Put your phone number for Otp</h1>
        <PhoneInput className="bg-orange-300"
          country={'in'}
          value={phone}
          onChange={(phone)=>setPhone("+" + phone)}
        />
        <div id='recap' className='mt-2 ml-10'></div>
        <Form.Item>
          <Button htmlType='submit' className="w-96 h-10 mt-4 text-lg font-bold dark:bg-white">Send Otp</Button>
        </Form.Item>
      </Form>
      )}

    {showVerify && (
      <Form>
        <h1 className="text-2xl font-bold mb-2">Verify OTP</h1>
        <Form.Item
          name="opt"
          rules={[
            {
              required: true,
              message: "Please enter your opt!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter your opt"
            className="w-96 h-10"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />     
        </Form.Item> 
        <Form.Item>
          <Button htmlType='submit' onClick={verifyOtp} className="w-96 h-10 mt-4 text-lg font-bold dark:bg-white">Submit</Button>
        </Form.Item>
      </Form>
      
       )}
    </div>
  )
}

export default memo(page)