// import { Google } from "@mui/icons-material"
// import { Button, Grid } from "@mui/material"
// import { GoogleLogin } from "@react-oauth/google"
// import AuthModal from "./AuthModal"
// import { useState } from "react"

// const Authenticaton =()=>{
//    const [openAuthModal,setOpenAuthModal] = useState(false);
//    const handleOpenAuthModal=()=>setOpenAuthModal(true);
//    const handleCloseAuthModal=()=>setOpenAuthModal(false);
//      return (
//         <div>
//          <Grid className='overflow-y-hidden' container>
//             <Grid className='hidden lg:block' item lg={7}>

//                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwMCnEtKldsDWc8BhD4Wd8asclP5GlE4Y5fg&s" className="w-full h-screen" alt=""/>

//                <div className='absolute top-[26%] left-[19%]'>
//                   <img width={300} height={300} src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?ga=GA1.1.1119583858.1747712609&semt=ais_hybrid&w=740" alt="" />
//                </div>

//             </Grid>

//             <Grid className="px-10" lg={5} xs={12}>
//                   <h1 className=" mt-10 font-bold text-7xl">Happening Now</h1>
//                   <h1 className="font-bold text-3xl py-16">Join Twitter Today</h1>

//                   <div className="w-[60%]">
//                      <div className="w-full">
//                         <GoogleLogin with={330}/>
//                         <p className="py-5 text-center">OR</p>

//                         <Button fullWidth variant="contained" size="large" sx={{
//                            borderRadius:"29px",
//                            py:"7px",
//                         }}
//                         onClick={handleOpenAuthModal}
//                         >Create Account</Button>

//                         <p className="text-sm mt-2 ">By signing up, you agree to the Terms of Service and
//                            Privacy Policy, including Cookie Use. 
//                         </p>
//                      </div>

//                      <div className="mt-10">
//                         <h1 className="font-bold text-xl mb-5">Alerady Have Account ?</h1>
//                         <Button fullWidth variant="outlined" size="large" sx={{
//                            borderRadius:"29px",
//                            py:"7px",
//                         }}
//                         onClick={handleOpenAuthModal}
//                         >Login</Button> 
                        
//                      </div>

//                   </div>
//             </Grid>

//          </Grid>

//          <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal}/>   
         
//         </div>

//      )
// }
// export default Authenticaton

// import React, { useState, useEffect } from "react";
// import "./authentication.css";
// import SigninForm from "./SigninForm";
// import SignupForm from "./SignupForm";

// const Authentication = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   useEffect(() => {
//     document.body.style.background = isLogin
//       ? "linear-gradient(90deg, #c9d6ff, #5071ae)"
//       : "linear-gradient(90deg, #5071ae, #c9d6ff)";
//     return () => {
//       document.body.style.background = "";
//     };
//   }, [isLogin]);

//   return (
//     <div className={`container ${isLogin ? "" : "active"}`}>
//       {isLogin ? <SigninForm /> : <SignupForm/>}

//       <div className="toggle-box">
//         <div className="logo-watermark login-logo">
//           <img src="/Logo1.png" alt="logo1" />
//         </div>
//         <div className="logo-watermark register-logo">
//           <img src="/Logo.png" alt="logo2" />
//         </div>
//         <div className="toggle-panel toggle-left">
//           <h1>Hello! Welcome</h1>
//           <p>Don't have an account?</p>
//           <button className="btn register-btn" onClick={() => setIsLogin(false)}>
//             Register
//           </button>
//         </div>
//         <div className="toggle-panel toggle-right">
//           <h1>Welcome Back!</h1>
//           <p>Already have an account?</p>
//           <button className="btn login-btn" onClick={() => setIsLogin(true)}>
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Authentication;


// ✅ Updated Authentication.jsx
import React, { useState, useEffect } from "react";
import "./authentication.css";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.body.style.background = isLogin
      ? "linear-gradient(90deg, #c9d6ff, #5071ae)"
      : "linear-gradient(90deg, #5071ae, #c9d6ff)";
    return () => {
      document.body.style.background = "";
    };
  }, [isLogin]);

  return (
    <div className="auth-container">
      <div className={`container ${isLogin ? "" : "active"}`}>
        {isLogin ? <SigninForm /> : <SignupForm />}

        <div className="toggle-box">
          <div className="logo-watermark login-logo">
            <img src="/Logo1.png" alt="logo1" />
          </div>
          <div className="logo-watermark register-logo">
            <img src="/Logo.png" alt="logo2" />
          </div>
          <div className="toggle-panel toggle-left">
            <h1>Hello! Welcome</h1>
            <p>Don't have an account?</p>
            <button
              className="btn register-btn"
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              className="btn login-btn"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
