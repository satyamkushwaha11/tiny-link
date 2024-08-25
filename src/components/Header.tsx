import React from 'react'

const Header = () => {
  return (
    <div className='h-[10vh] w-full flex justify-center absolutes bg-gradient-to-r from-blue-500 to-purple-500'>
      <div className='flex justify-between items-center w-full px-4  lg:px-0 lg:w-3/4'>
        <h1 className='text-white font-[800] text-[1.2rem] lg:text-[2rem]'>
          Tiny-Link
        </h1>
        <ul className=' flex gap-2 md:gap-4 text-white text-[.7rem] md:text-[.8rem] lg:text-[1rem]'>
          <li className={`hover:text-black  cursor-pointer`}>Home</li>
          <li className={`hover:text-black  cursor-pointer`}>Anlaytics</li>
          <li className={`hover:text-black  cursor-pointer`}>About-Us</li>
        </ul>
      </div>
    </div>
  )
}

export default Header