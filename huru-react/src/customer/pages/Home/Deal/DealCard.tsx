import React from 'react'

const DealCard = () => {
    return (
        <div className='w-[13rem] cursor-pointer '>
            <img
                className='border-x-[7px] border-t-[7px] border-pink-600 w-full h-[12rem]
      object-cover object-top '
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqcJ2HJrmmOu7qfh5Z-t82Q8AK7haeFg4tfQ&s" alt="" />
            <div className='border-4 border-black bg-black text-white p-2 text-center'>
                <p className=' text-lg font-semibold'>Smart Watch</p>
                <p className='text-2x1 font-bold'>20% OFF</p>
                <p className='text-balance text-lg'>shop now</p>
            </div>
        </div>
    )
}

export default DealCard
