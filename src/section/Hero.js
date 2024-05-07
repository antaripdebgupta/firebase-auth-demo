import React,{memo} from 'react'

const Hero = () => {
  return (
    <section className="h-screen flex flex-col align-center items-center gap-2 top-0 p-2 pt-36 font-sans dark:text-white">
     <h1 className="text-2xl font-bold mb-2">This is a <span className='text-yellow-400'>Firebase </span>authentication demo application with <span className='text-blue-400'>NEXT.js</span></h1>
    </section>
  )
}

export default memo(Hero)