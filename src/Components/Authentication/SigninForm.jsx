
// ✅ Updated SigninForm.jsx
import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginUser } from "../../Store/Auth/Action";
import { toast } from 'react-toastify';
import { fetchUserLocation } from "../../Utils/location";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SigninForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const loc = await fetchUserLocation();
      values.location = loc;
       console.log("Form value ", values);
      dispatch(loginUser(values));
     
    },
  });

  return (
    <div className="auth-container">
      <div className="form-box login">
        <form onSubmit={formik.handleSubmit}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i className="bx bx-envelope"></i>
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i className="bx bx-lock"></i>
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn">
            Login
          </button>

          <p>or login with social platform</p>
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

export default SigninForm;