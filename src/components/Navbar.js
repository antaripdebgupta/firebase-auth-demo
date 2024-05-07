"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React,{memo} from 'react'
import { Button } from 'antd'
import { AiOutlineUser } from "react-icons/ai";
import Theme from './Theme';
import Sidebar from './Sidebar'

function Navbar() {
  const sectionLink = [
      {name:"Home",link:"/"},
      {name:"About",link:"/content/about"},
      {name:"Contact Us",link:"/content/contact"},
  ]

  const pathname = usePathname();
  const isActive = (link) => {
    return link === pathname ? "text-green-600" : '';
  }
  
  return (
    <nav className="flex w-full justify-between py-5 fixed top-0 z-30 border-b-2 border-yellow-200 md:item-start sm:item-start bg-white-200 strick bg-white dark:bg-dark">
      <Link href="/" rel="preload" className="xl:pl-10 lg:pl-6 outline-none outline-transparent outline-0 dark:text-white">
        <h2 className="font-bold outline-2 focus:outline-green-500 p-2 pt-0 dark:text-white" tabIndex="0">firebase<span className='text-green-600'>Auth.</span></h2>
      </Link>
      <ul className="hidden h-full gap-12 lg:flex text-nowrap">
      {
         sectionLink.map(({name,link})=>
         <li key={name} className={`flex justify-center items-center px-2  fill-none outline-none outline-transparent outline-0  whitespace-nowrap dark:text-white `} >
           <Link href={link} rel="preload" className={`${isActive(link)} outline-2 focus:outline-green-500 `}>
             {name}
           </Link>
         </li>)
      }
      </ul>
      <div className="hidden lg:flex pr-10 gap-2">
        <Link href="/auth/login" rel="preload" className="outline-o outline-transparent outline-none">
          <Button className="bg-black dark:bg-white dark:text-black font-sans font-bold" type="primary" shape="round" icon={<AiOutlineUser />}>
              Login
          </Button>
        </Link>
        <span className='h-6 text-center w-[2px] bg-black dark:bg-white mt-1 ml-1'></span>
        <Theme />
      </div>
      <Sidebar/>
    </nav>
  )
}

export default memo(Navbar)