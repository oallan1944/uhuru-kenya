import React from 'react'
import  './ShopByCategory.css'

const ShopByCategoryCard = () => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
      <div className='custom-border w-[150px] h-[150px] lg:w[249px] lg:h-[249] rounded-full bg-primary-color'>
        <img
        className=' rounded-full group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top h-full w-full'
         src=" https://images.pexels.com/photos/8251782/pexels-photo-8251782.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
      </div>
      <h1>Kitchen & Table</h1>
      
    </div>
  )
}

export default ShopByCategoryCard
