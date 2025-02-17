// import React, { useContext, useState } from 'react'
// import './LoginPopup.css'
// import { assets } from '../../assets/assets'
// import { StoreContext } from '../../Context/StoreContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const LoginPopup = ({ setShowLogin }) => {

//     const { setToken, url,loadCartData } = useContext(StoreContext)
//     const [currState, setCurrState] = useState("Sign Up");

//     const [data, setData] = useState({
//         name: "",
//         email: "",
//         password: ""
//     })

//     const onChangeHandler = (event) => {
//         const name = event.target.name
//         const value = event.target.value
//         setData(data => ({ ...data, [name]: value }))
//     }

//     const onLogin = async (e) => {
//         e.preventDefault()

//         let new_url = url;
//         if (currState === "Login") {
//             new_url += "/api/user/login";
//         }
//         else {
//             new_url += "/api/user/register"
//         }
//         const response = await axios.post(new_url, data);
//         if (response.data.success) {
//             setToken(response.data.token)
//             localStorage.setItem("token", response.data.token)
//             loadCartData({token:response.data.token})
//             setShowLogin(false)
//         }
//         else {
//             toast.error(response.data.message)
//         }
//     }

//     return (
//         <div className='login-popup'>
//             <form onSubmit={onLogin} className="login-popup-container">
//                 <div className="login-popup-title">
//                     <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
//                 </div>
//                 <div className="login-popup-inputs">
//                     {currState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
//                     <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
//                     <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
//                 </div>
//                 <button>{currState === "Login" ? "Login" : "Create account"}</button>
//                 <div className="login-popup-condition">
//                     <input type="checkbox" name="" id="" required/>
//                     <p>By continuing, i agree to the terms of use & privacy policy.</p>
//                 </div>
//                 {currState === "Login"
//                     ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
//                     : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
//                 }
//             </form>
//         </div>
//     )
// }

// export default LoginPopup
import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ResetPassword.css'
const LoginPopup = ({ setShowLogin }) => {
    const { setToken, url, loadCartData } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [forgotPassword, setForgotPassword] = useState(false); // Manage forgot password state
    const [resetEmail, setResetEmail] = useState("");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Handle input changes for login/signup
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((data) => ({ ...data, [name]: value }));
    };

    // Handle Login or Sign Up
    const onLogin = async (e) => {
        e.preventDefault();

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        } else {
            new_url += "/api/user/register";
        }

        try {
            const response = await axios.post(new_url, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                loadCartData({ token: response.data.token });
                setShowLogin(false);
                toast.success(`Welcome ${currState === "Login" ? "back" : ""}!`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    // Handle Forgot Password
    const onForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url}/api/user/forgot-password`, { email: resetEmail });
            if (response.data.success) {
                toast.success("Password reset email sent. Check your inbox!");
                setForgotPassword(false); // Return to login view
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-popup">
            {!forgotPassword ? (
                <form onSubmit={onLogin} className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>{currState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                    </div>
                    <div className="login-popup-inputs">
                        {currState === "Sign Up" && (
                            <input
                                name="name"
                                onChange={onChangeHandler}
                                value={data.name}
                                type="text"
                                placeholder="Your name"
                                required
                            />
                        )}
                        <input
                            name="email"
                            onChange={onChangeHandler}
                            value={data.email}
                            type="email"
                            placeholder="Your email"
                            required
                        />
                        <input
                            name="password"
                            onChange={onChangeHandler}
                            value={data.password}
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button>{currState === "Login" ? "Login" : "Create account"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                    {currState === "Login" ? (
                        <>
                            <p>
                                Create a new account?{' '}
                                <span onClick={() => setCurrState('Sign Up')}>Click here</span>
                            </p>
                            <p>
                                Forgot password?{' '}
                                <span onClick={() => setForgotPassword(true)}>Click here</span>
                            </p>
                        </>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <span onClick={() => setCurrState('Login')}>Login here</span>
                        </p>
                    )}
                </form>
            ) : (
                <form onSubmit={onForgotPassword} className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>Forgot Password</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                    </div>
                    <div className="login-popup-inputs">
                        <input
                            name="email"
                            onChange={(e) => setResetEmail(e.target.value)}
                            value={resetEmail}
                            type="email"
                            placeholder="Your email"
                            required
                        />
                    </div>
                    <button>Reset Password</button>
                    <p>
                        Remembered your password?{' '}
                        <span onClick={() => setForgotPassword(false)}>Login here</span>
                    </p>
                </form>
            )}
        </div>
    );
};

export default LoginPopup;

