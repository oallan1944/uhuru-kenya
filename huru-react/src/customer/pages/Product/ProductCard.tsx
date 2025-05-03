import React, { useEffect, useState } from 'react'
import "./ProductCard.css"
import { Button } from '@mui/material'
import { Favorite, ModeComment } from '@mui/icons-material'
import { teal } from '@mui/material/colors'

const images = [
    "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9",
    "https://images.unsplash.com/photo-1527719327859-c6ce80353573",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    "https://images.pexels.com/photos/9558699/pexels-photo-9558699.jpeg"

]

const ProductCard = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: any
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % images.length);
            }, 2000);
        }
        else if (interval) {
            clearInterval(interval);
            interval = null;
        }
        return () => clearInterval(interval);

    }, [isHovered])
    return (
        <>
            <div className='group px-4 relative'>
                <div className='card'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >

                    {images.map((item, index) => <img
                        className='card-media object-top'

                        src={item} alt=""
                        style={{ transform: `translateX(${(index - currentImage) * 100}%)` }}
                    />)}

                    {
                        isHovered &&
                        <div className='indicator flex flex-col items-center space-y-2'>
                            <div className='flex gap-3'>
                                <Button variant='contained' color='secondary'>
                                    <Favorite sx={{ color: teal[500] }} />

                                </Button>

                                <Button variant='contained' color='secondary'>
                                    <ModeComment sx={{ color: teal[500] }} />

                                </Button>

                            </div>

                        </div>
                    }
                </div>
                <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>

                    <div className='name'>
                        <h1>Polo</h1>
                        <p>White T-shirt</p>
                    </div>
                    <div className='price flex items-center gap-3'>
                        <span className='font-sans text-gray-800'>
                            $4
                        </span>
                        <span className='thin-line-through text-gray-500'>
                            $5
                        </span>
                        <span className='text-primary-color font-semibold'>
                            60%
                        </span>


                    </div>

                </div>

            </div>

        </>
    )
}

export default ProductCard
