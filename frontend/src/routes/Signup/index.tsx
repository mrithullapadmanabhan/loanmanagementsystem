import React, { useState } from 'react'
// import { GoogleSignIn, signUp } from '../../service/api';
import { Link } from 'react-router-dom';
// import { withRouter } from '../../authentication/withRouter';
import { BiMoney } from 'react-icons/bi'


function SignUp() {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        reference: ''
    });
    const [error, setError] = useState("");

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // You can perform form validation or submit the form data to a server here
        if (formData.password !== formData.confirm_password) {
            setError("Password Don't Match");
            return;
        }
        // const res = await signUp(formData);
        // if (res.success === false) {
        //     setError(res.error);
        //     return;
        // } else {
        //     window.location.reload();
        // }
    };



    return (
        <div className='flex justify-center  h-screen'>
            <div className='px-5 md:px-0 md:w-[25%] mt-12'>
                {/* logo */}
                <div className='mb-10 flex justify-center'>
                    <BiMoney className="w-20 aspect-auto mr-2" />
                </div>
                {/* Heading */}
                <div className='space-y-2'>
                    <h2 className='text-xl md:text-3xl font-bold text-center'>Create an account</h2>
                    <p className='text-center'>Or <Link to='/sign-in' className={`text-[#4338CA] font-semibold text-sm`}>login to your account</Link></p>
                </div>
                {error && <div className='bg-red-500 my-3 py-2 rounded'>
                    <p className='text-center text-white font-semibold'>{error}</p>
                </div>}
                <form className='mt-8 space-y-3' onSubmit={handleSubmit}>
                    <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2'>
                        <div className='form-group'>
                            <label htmlFor='first_name' className='input-label'>First Name</label>
                            <input type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange} className='input' placeholder='Mary' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='last_name' className='input-label'>Last Name</label>
                            <input type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange} className='input' placeholder='Westmacott' />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email' className='input-label'>Email</label>
                        <input type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange} className='input' placeholder='marry@gmail.com' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password' className='input-label'>Password</label>
                        <input type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange} className='input' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password' className='input-label'>Confirm Password</label>
                        <input type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange} className='input'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='detail' className='input-label'>How did you learn about us? (Go into as much detail as you like)</label>
                        <input type="text"
                            name="reference"
                            value={formData.reference}
                            onChange={handleChange} className='input' />
                    </div>
                    <button className='bg-[#4338CA] long-button'>Create Account</button>
                </form>

            </div>
        </div >
    )
};

// SignUp = withRouter(SignUp);//has to be used like this
export default SignUp;