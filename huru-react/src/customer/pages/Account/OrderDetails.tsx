
import { Box, Button, Divider } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import OrderStepper from './OrderStepper'
import PaymentsIcon from '@mui/icons-material/Payments';



const OrderDetails = () => {
    const navigate = useNavigate()
    return (
        <Box className='space-y-5' >
            <section className='flex flex-col gap-5 justify-center items-center'>
                <img className='w-[100px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqcJ2HJrmmOu7qfh5Z-t82Q8AK7haeFg4tfQ&s" alt="" />
                <div className='text-sm space-y-1 text-center' >
                    <h1 className='font-bold'>Raam Clothing</h1>
                    <p>
                        Celler RAY 1.43" AMOLED Display | 700 NITS | ADD | BT-Calling | AI
                        Voice | Split Screen Smartwatch(Black Strap, Free Size)
                    </p>
                    <p>
                        <strong>size : </strong>
                        M
                    </p>
                </div>
                <div>
                    <Button onClick={() => navigate(`/reviews/${5}/create`)}>
                        Write Review
                    </Button>
                </div>
            </section>
            <section className='border p-5'>
                <OrderStepper orderStatus={"SHIPPED"} />
            </section>
            <div className='border p-5'>
                <h1 className='font-bold pb-3'>Delivery Address</h1>
                <div className='text-sm space-y-2'>
                    <div className='flex gap-5 font-medium'>
                        <p>{"Allan Order"}</p>
                        <Divider flexItem orientation='vertical' />
                        <p>{" 0000000000"}</p>
                    </div>
                    <p>
                        {"Nkuma University, Entebbe Uganda"}
                    </p>
                </div>
            </div>
            <div className='border space-y-4'>
                <div className='flex justify-between text-sm pt-5 px-5'>
                    <div className='space-y-1'>
                        <p className='font-bold'>Total Item Price</p>
                        <p>You Saved <span className='text-green-500 font-mediun text-xs'> ${"2"}.00</span> On this Item</p>

                    </div>
                    <p className='font-medium'>${"13"}.00</p>
                </div>
                <div className='px-5'>
                    <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
                        <PaymentsIcon />
                        <p>Pay On Delivery</p>
                    </div>
                </div>

                <Divider />
                <div className='px-5 pb-5'>
                    <p className='text-xs'>Sold by: <strong>{"Raam Clothing"}</strong></p>
                </div>
                <div className='p-10'>
                    <Button
                        disabled={true}
                        color='error' sx={{ py: "0.7rem" }} className='' variant='outlined' fullWidth
                    >
                        {true ? "order canceled" : "Cancel Order"}
                    </Button>
                </div>
            </div>
        </Box>
    )
}

export default OrderDetails
