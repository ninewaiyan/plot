import React, { useState, useEffect } from "react";
import "./authentication.css";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.body.style.background = isLogin
      ? "linear-gradient(90deg, #2e06e1ff, #35d4ecff)"
      : "linear-gradient(90deg, #0725e6ff, #c9d6ff)";
    return () => {
      document.body.style.background = "";
    };
  }, [isLogin]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Left Panel with lighter colors and upgraded content */}
      <div className="hidden lg:flex flex-col justify-center items-start text-gray-100 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 w-1/2 h-full p-16 rounded-r-3xl shadow-xl space-y-10">
        <h1 className="text-5xl font-extrabold leading-tight max-w-xl drop-shadow-md">
          Plot.com
        </h1>

        <p className="text-lg max-w-lg opacity-90 leading-relaxed drop-shadow-sm">
          Unlock your voice in a vibrant space where every thought matters.
          Build meaningful connections through authentic expression. Cultivate
          creativity that sparks conversations and inspires change. Here, your
          ideas don’t just float—they gain momentum and meaning.
        </p>

        <div className="bg-white bg-opacity-15 rounded-lg p-8 max-w-md backdrop-blur-sm shadow-md">
          <h2 className="text-3xl font-semibold mb-5 drop-shadow-sm">
            Why Choose Plot?
          </h2>
          <ul className="list-disc list-inside space-y-3 text-md">
            <li>
              <strong>Freedom to Share:</strong> Voice your thoughts without
              limits, anytime, anywhere.
            </li>
            <li>
              <strong>Deep Engagement:</strong> Like, replot, and collect ideas
              that resonate with you.
            </li>
            <li>
              <strong>Earn Recognition:</strong> Your creativity earns real
              value and community respect.
            </li>
            <li>
              <strong>Grow Your Network:</strong> Follow, connect, and
              collaborate with like-minded thinkers.
            </li>
            <li>
              <strong>Privacy First:</strong> Secure platform designed with your
              safety and trust in mind.
            </li>
          </ul>
        </div>

        <p className="italic text-sm opacity-80 max-w-sm drop-shadow-sm">
          Step into Plot today — where your ideas evolve into impact.
        </p>
      </div>

      {/* Right - Keep your existing auth-container as-is */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="auth-container">
          <h1 className="text-5xl font-extrabold leading-tight max-w-xl drop-shadow-md text-neutral-100">
            Plot Your Thought and Earn Your Worth
          </h1>
        
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
            <p className="text-2xl mt-4 text-neutral-200 italic drop-shadow-sm">
            Your creativity is currency. Your voice, your value.
          </p>
        </div>
        
      </div>
      
    </div>
  );
};

export default Authentication;
