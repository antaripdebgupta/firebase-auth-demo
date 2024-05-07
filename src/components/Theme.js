import React,{memo,useState,useEffect} from 'react'
import {MdOutlineLightMode,MdOutlineDarkMode} from 'react-icons/md';

const Theme = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
       const theme = localStorage.getItem('theme');
       if (theme == "dark") setDarkMode(false);  
    },[])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode])

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

  return (
    <>
      <button onClick={toggleTheme} className='px-2 pt-2 sm:pt-0 outline-2 focus:outline-blue-600 text-xl' aria-label='them'>
          {darkMode ? <MdOutlineLightMode className="text-yellow-600" /> : <MdOutlineDarkMode />}
      </button>
    </>
  )
}

export default memo(Theme)