import React,{memo} from 'react'

const page = () => {
  return (
    <div className="h-screen flex flex-col align-center items-center  gap-2 top-0 pt-36 font-sans dark:text-white">
        <h1 className="text-2xl font-bold mb-2">Pricing</h1>
    </div>
  )
}

export default memo(page)