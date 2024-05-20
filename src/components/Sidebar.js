import React,{memo, useState, useEffect} from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { UserAuth } from '@/lib/authContext'
import { IoReorderThreeOutline,IoChevronForwardOutline } from "react-icons/io5";
import Theme from './Theme';

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname();
  const [isOpen,setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const { googleLogOut } = UserAuth();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setToken(authToken);
  }, []);

  const sectionLink = [
    {name:"Home",link:"/"},
    {name:"About",link:"/content/about"},
    {name:"Contact Us",link:"/content/contact"},
  ]

  const loggedSectionLink = [
    ...sectionLink,
    {name:"Pricing",link:"/content/pricing"},
    {name:"Service",link:"/content/service"},
  ]

  const isActive = (link) => {
    return link === pathname ? "text-green-600" : '';
  }

  const handleLogout = () => {
    googleLogOut();
    localStorage.removeItem('authToken');
    router.push('/');
    closeSidebar();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const linksToRender = token ? loggedSectionLink : sectionLink;

  return (
    <nav className="lg:hidden h-10 w-10">
      {isOpen && (
        <div className="fixed top-0 right-0 bottom-0">
          <div className="sidebar top-0 right-0 w-[200px] sm:w-[300px] h-full flex flex-col items-center justify-center bg-gray-600 text-white">
            <ul className="flex flex-col items-start justify-center h-full text-nowrap">
            {linksToRender.map(({ name, link }) => (
                <li key={name} className={` flex justify-center items-center px-2 text-white fill-none outline-none outline-transparent outline-0 p-2 `}>
                  <Link href={link} rel="preload" className={`${isActive(link)} outline-2 focus:outline-green-500 `} onClick={closeSidebar}>
                    {name}
                  </Link>
                </li>
              ))}
              {token ? (
                <button onClick={handleLogout} className="p-2 outline-2 focus:outline-green-500">
                  Logout
                </button>
              ) : (
                <Link href="/auth/login" onClick={closeSidebar} rel="preload" className="p-2 outline-2 focus:outline-green-500">
                  Login
                </Link>
              )}
              <Theme />
            </ul>
          </div>
        </div>
      )}
      <button onClick={toggleSidebar} className="cursor-pointer absolute w-10 h-10 top-5 bg-transparent outline-none border-none">
        {isOpen ? <IoChevronForwardOutline className='text-2xl' /> : <IoReorderThreeOutline className='text-2xl dark:text-white'/>}
      </button>
    </nav>
  )
}

export default memo(Sidebar)