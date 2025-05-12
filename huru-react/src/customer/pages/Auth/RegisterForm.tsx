import { useFormik } from 'formik'
import React from 'react'
import { sendLoginSignupOtp } from '../../../State/authSlice'
import { useAppDispatch } from '../../../State/store'
import { Button, TextField } from '@mui/material'

const RegisterForm = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
            fullName: "",
        },
        onSubmit: (values) => {
            console.log("form data", values)

        }
    })

    const handleSendOtp = () => {
        dispatch(sendLoginSignupOtp({ email: formik.values.email }))
    }
    return (
        <div>
            <h1 className='text-center font-bold text-xl text-primary-color pb-8'>SignUp</h1>
            <div className='space-y-3'>
                <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                {true &&
                    <div className='space-y-3'>
                        <div className='space-y-2'>
                            <p className=' font-medium text-sm opacity-60'>
                                Enter OTP sent to your email
                            </p>
                            <TextField
                                fullWidth
                                name="otp"
                                label="Otp"
                                value={formik.values.otp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.otp && Boolean(formik.errors.otp)}
                                helperText={formik.touched.otp && formik.errors.otp}
                            />
                        </div>
                        <TextField
                            fullWidth
                            name="fullName"
                            label="Full Name"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                        />
                    </div>
                }

                {false && <Button onClick={handleSendOtp} fullWidth variant='contained' sx={{ py: "11px" }}>
                    Send otp
                </Button>}
                <Button onClick={() => formik.handleSubmit()}
                    fullWidth variant='contained' sx={{ py: "11px" }}>
                    SignUp
                </Button>
            </div>
        </div>
    )
}

export default RegisterForm
