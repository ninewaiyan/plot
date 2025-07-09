
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Store/Auth/Action';
import { fetchUserLocation } from '../../Utils/location';

const validationSchema = Yup.object({
  fullName: Yup.string().min(2, 'Too Short!').required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignupForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const loc = await fetchUserLocation();
      values.location = loc;
      dispatch(registerUser(values));
    },
  });

  return (
    <div className="auth-container">
      <div className="form-box register">
        <form onSubmit={formik.handleSubmit}>
          <h1>Register</h1>

          {/* Full Name */}
          <div className="input-box">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.fullName && formik.errors.fullName ? 'input-error' : ''}
            />
            <i className="bx bxs-user"></i>
            {formik.touched.fullName && formik.errors.fullName && (<div className="error">{formik.errors.fullName}</div>)}
          </div>

          {/* Email */}
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
            />
            <i className="bx bxs-envelope"></i>
            {formik.touched.email && formik.errors.email && (<div className="error">{formik.errors.email}</div>)}
          </div>

          {/* Password */}
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
            />
            <i className="bx bx-lock"></i>
            {formik.touched.password && formik.errors.password && (<div className="error">{formik.errors.password}</div>)}
          </div>

          {/* Confirm Password */}
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''}
            />
            <i className="bx bxs-lock-alt"></i>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (<div className="error">{formik.errors.confirmPassword}</div>)}
          </div>

          <button type="submit" className="btn">Register</button>
          <small>Or Login</small>

          <div className="social-icons">
            <a href="#"><i className="bx bxl-github"></i></a>
            <a href="#"><i className="bx bxl-google"></i></a>
            <a href="#"><i className="bx bxl-linkedin"></i></a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
