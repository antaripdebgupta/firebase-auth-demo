import React,{memo} from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

const page = () => {
  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col align-center items-center  gap-2 top-0 pt-36 font-sans dark:text-white">
        <h1 className="text-2xl font-bold mb-2">Service</h1>
      </div>
    </ProtectedRoute>
  )
}

export default memo(page)