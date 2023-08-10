import React, { useState } from 'react'
import { BiMoney } from 'react-icons/bi'
// import { GoogleSignIn, login } from '../../service/api';


//Form Data Handling
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState("");

    const handleInputChange = (event: { target: { name: any; value: string; }; }) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
        setError('');
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!formData.email.trim() || !formData.password.trim()) {
            setError("Provide all fields");
            return;
        }
        // const res = await login(formData);
        // if (res.success === false) {
        //     setError(res.error);
        // } else {
        //     window.location.reload();

        // }
    };

    
    return (
        <div className='flex justify-center  h-screen'>
            <div className='px-5 py-8 md:px-0 md:w-[25%] mt-12'>
                {/* logo */}
                <div className='mb-10 flex justify-center'>
                    <BiMoney className="w-20 aspect-auto mr-2" />
                </div>
                {/* Heading */}
                {error && <div className='bg-red-500 my-3 py-2 rounded'>
                    <p className='text-center text-white font-semibold'>{error}</p>
                </div>}
                <form className='mt-8 space-y-5' onSubmit={handleSubmit} >
                    <div className='form-group'>
                        <label htmlFor='email' className='input-label'>Email</label>
                        <input type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='marry@gmail.com'
                            className='input'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password' className='input-label'>Password</label>
                        <input type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className='input' />
                    </div>
                    <button className='bg-[#4338CA] long-button' type='submit'>Sign in</button>
                </form>
                {/* <p className='text-[#4338CA] font-semibold my-5 text-sm'>Forgot your password?</p> */}
            </div>
        </div >
    )
};

// Login = withRouter(Login);
export default Login;