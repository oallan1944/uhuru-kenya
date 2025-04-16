import React from 'react'

const CategoryGrid = () => {
    return (
        <div className=' grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>

            <div className='col-span-3 row-span-12 text-white '>
                <img
                    className='w-full h-full object-cover object-top rounded-md'
                    src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />

            </div>
            <div className='col-span-2 row-span-6 text-white '>
                <img
                    className='w-full h-full object-cover object-top rounded-md'
                    src="https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=600  " alt="" />

            </div>
            <div className='col-span-4 row-span-6 text-white '>
                <img
                    className='w-full h-full object-cover object-top rounded-md'
                    src="https://images.pexels.com/photos/1034859/pexels-photo-1034859.jpeg?auto=compress&cs=tinysrgb&w=600   " alt="" />

            </div>
            <div className='col-span-3 row-span-12 text-white '>
                <img
                    className='w-full h-full object-cover object-top rounded-md'
                    src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600   " alt="" />

            </div>
            <div className='col-span-4 row-span-6 text-white '>
                <img
                    className='w-full h-full object-cover object-top rounded-md'
                    src="https://images.pexels.com/photos/137603/pexels-photo-137603.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />

            </div>
            <div className='col-span-2 row-span-6 text-white '>
                <img
                    className='w-full h-full object-cover object-top rounded-md'
                    src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />

            </div>

        </div>
    )
}

export default CategoryGrid
