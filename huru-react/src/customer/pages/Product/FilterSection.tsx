import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { teal } from '@mui/material/colors'
import React, { useState } from 'react'
import { colors } from '../../../Data/Filter/color'
import { useSearchParams } from 'react-router-dom'
import { price } from '../../../Data/Filter/price'
import { discount } from '../../../Data/Filter/discount'

const FilterSection = () => {
    const [expandColor, setExpandColor] = useState(false);
    const [searchParams, setSearchPrams] = useSearchParams();
    const handleColorToggle = () => {
        setExpandColor(!expandColor);
    };
    const updateFilterParams = (e: any) => {
        const { value, name } = e.target;
        if (value) {
            searchParams.set(name, value);
        } else {
            searchParams.delete(name);
        }
        setSearchPrams(searchParams);
    };

    const clearAllFilters = () => {
        console.log("clearAllFilters", searchParams)
        searchParams.forEach((value: any, key: any) => {
            searchParams.delete(key);
        });
        setSearchPrams(searchParams);
    };
    return (
        <div className='z-50 space-y-5 bg-white'>
            <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
                <p className='text-lg font-semibold'> Filters</p>
                <Button onClick={clearAllFilters} size='small' className='text bg-teal-600 cursor-pointer font-semibold'>
                    clear all
                </Button>
            </div>
            <Divider />
            <div className='px-9 space-y-6'>
                <section>
                    <FormControl>
                        <FormLabel
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: teal[500],
                                pb: "14px"
                            }}
                            className='text-2xl font-semibold'
                            id='color'
                        >
                            Color
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="color"
                            defaultValue=""
                            name="color"
                            onChange={updateFilterParams}
                        >
                            {colors.slice(0, expandColor ? colors.length : 5).map((item) => <FormControlLabel value={item.name} control={<Radio />}
                                label={<div className='flex items-center gap-3'>
                                    <p>{item.name}</p>
                                    <p style={{ backgroundColor: item.hex }}
                                        className={`h-5 w-5 rounded-full
                                 ${item.name === "white" ? "border" : ""}`}>
                                    </p>
                                </div>} />
                            )}
                        </RadioGroup>
                    </FormControl>
                    <div>
                        <Button
                            onClick={handleColorToggle}
                            className='text-primary-color cursor-pointer hover:text-teal-900 flex items-center'>
                            {expandColor ? "hide" : `+${colors.length - 5} more`}
                        </Button>
                    </div>
                </section>
                <section>
                    <FormControl>
                        <FormLabel
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                pb: "14px",
                                color: teal[600]
                            }}
                            className='text-2xl font-semibold' id='Price'
                        >
                            Price
                        </FormLabel>
                        <RadioGroup
                            name='price'
                            onChange={updateFilterParams}
                            aria-labelledby='price'
                            defaultValue=""
                        >
                            {price.map((item, index) => (
                                <FormControlLabel
                                    key={item.name}
                                    value={item.value}
                                    control={<Radio size='small' />}
                                    label={item.name}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </section>
                <Divider />
                <section>
                    <FormControl>
                        <FormLabel
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                pb: "14px",
                                color: teal[600]
                            }}
                            className='text-2xl font-semibold'
                            id='brand'
                        >
                            Discount
                        </FormLabel>
                        <RadioGroup
                            name='discount'
                            onChange={updateFilterParams}
                            aria-labelledby='brand'
                            defaultValue=''
                        >
                            {discount.map((item, index) => (
                                <FormControlLabel
                                    key={item.name}
                                    value={item.value}
                                    control={<Radio size='small' />}
                                    label={item.name}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </section>
            </div>

        </div>
    )
}

export default FilterSection
