import { Password } from '@mui/icons-material'
import { Button, Grid, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email:Yup.string().email("Invalid email").required("Email is Required"),
    password:Yup.string().required("Password is required")
})
const SigninForm = () => {

    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema,
        onSubmit:(values)=>{
            console.log("Form value ",values)
        }

    })
  return (
    <div>
        <form action="">
            <Grid container spacing={2}>
                <Grid item xs = {12}>
                    <TextField
                    fullWidth
                    label="Email"
                    name='email'
                    variant = 'outlined'
                    size='large'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>

                

                <Grid item xs = {12}>
                    <TextField
                    fullWidth
                    label="Password"
                    name='password'
                    variant = 'outlined'
                    size='large'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>

                <Grid className="" item xs = {12}>
                    <Button
                    sx={{borderRadius:"29px",py:"15px",bgcolor:blue[500]}}
                    type="submit"
                    fullWidth
                    variant='contained'
                    size="large"

                    >
                        Sign In

                    </Button>
                    
                </Grid>

            </Grid>
        </form>

        
    </div>
  )
}

export default SigninForm