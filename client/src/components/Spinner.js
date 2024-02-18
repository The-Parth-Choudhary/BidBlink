import React from 'react'

function Spinner() {
  return (
    <div className='fixed inset-0 bg-black z-10 flex justify-center items-center opacity-60'>
        <div className='w-14 h-14 border-1 border-solid border-white border-t-transparent rounded-full animate-spin'>
            
        </div>
    </div>
  )
}

export default Spinner