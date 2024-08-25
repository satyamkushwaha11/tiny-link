import React from 'react'

const Footer = () => {
  return (
    <div className='min-h-[5vh] '>
      <div className='bg-pink-500  h-[1px]'></div>

      <div className='h-full py-2 bg-black border-t-[1px] border-white w-full flex justify-center items-center'>

        <div className='flex justify-between w-full px-4  py-3 lg:px-0 lg:w-3/4 '>
          <div className='text-white'>
            About : This is url shortner website.
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Made by Satyam-kushwaha
          </div>

        </div>
      </div>

    </div>
  )
}

export default Footer