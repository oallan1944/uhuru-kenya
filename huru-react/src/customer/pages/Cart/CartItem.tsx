import { Add, Close, Remove } from '@mui/icons-material'
import { Button, Divider, IconButton } from '@mui/material'
import React from 'react'

const CartItem = () => {
    const handleUpdateQuantity = () => {
        //Update cart Item Quantinty
    }
    return (
        <div className='border rounded-md relative'>
            <div className='p-5 flex gap-3'>
                <div>
                    <img className='w-[90px] rounded-md'
                        src="https://images.unsplash.com/photo-1527719327859-c6ce80353573" alt="" />
                </div>
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Raam Clothing</h1>
                    <p className='text-gray-600 font-medium text-sm'>Cotton T-Shirts in Various colors</p>
                    <p className='text-gray-400 text-xs'><strong>Sold by: </strong>Raam Clothing</p>
                    <p className='text-sm'>7 days replacement available</p>
                    <p className='text-sm text-gray-600'><strong>Quantity: </strong> 5</p>
                </div>

            </div>
            <Divider />
            <div className='flex justify-between items-center '>
                <div className='px-5 py-2 flex justify-between items-center'>
                    <div className='flex items-center gap-2 w-[140px] justify-between'>
                        <Button onClick={handleUpdateQuantity} disabled={true}>
                            <Remove />
                        </Button>
                        <span>{5}</span>
                        <Button onClick={handleUpdateQuantity}>
                            <Add />
                        </Button>
                    </div>
                </div>
                <div className='pr-5'>
                    <p className='text-gray-700 font-medium'>$5</p>
                </div>
                <div className='absolute top-1 right-1'>
                    <IconButton color='primary'>
                        <Close />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default CartItem
