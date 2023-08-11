import React, { useState } from 'react'
import { BiMoney } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { login } from '../../service/api';


//Form Data Handling
function Login() {
    const [formData, setFormData] = useState({
        username: '',
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
        if (!formData.username.trim() || !formData.password.trim()) {
            setError("Provide all fields");
            return;
        }
        const res = await login(formData);
        console.log(res)
        if (res.success === false) {
            setError(res.message);
        } else {
            alert(res.message)
            window.location.reload();
        }
    };

    
    return (
        <div className='flex justify-center  h-screen'>
            <div className='px-5 py-8 md:px-0 md:w-[25%] mt-12'>
                {/* logo */}
                <div className='mb-5 flex justify-center'>
                    <BiMoney size={40} />
                </div>
                {/* Heading */}
                <div className='space-y-2'>
                    <h2 className='text-xl md:text-3xl font-bold text-center'>Login</h2>
                    <p className='text-center'>Or <Link to='/register' className={`text-[#4338CA] font-semibold text-sm`}>Create an account</Link></p>
                </div>
                {/* Heading */}
                {error && <div className='bg-red-500 my-3 py-2 rounded'>
                    <p className='text-center text-white font-semibold'>{error}</p>
                </div>}
                <form className='mt-8 space-y-5' onSubmit={handleSubmit} >
                    <div className='form-group'>
                        <label htmlFor='username' className='input-label'>Username</label>
                        <input type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder='Marry'
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