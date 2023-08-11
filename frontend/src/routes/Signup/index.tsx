import React, { useState } from 'react'
import { addUser } from '../../service/api';
import { Link } from 'react-router-dom';
// import { withRouter } from '../../authentication/withRouter';
import { BiMoney } from 'react-icons/bi'


function SignUp() {

    const [formData, setFormData] = useState({
        name: '',
        employeeID: '',
        email: "",
        password: '',
        confirm_password: '',
        dob: "",
        doj: '',
        department:'',
        designation: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm= ()=>{


        return true
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("")

        // You can perform form validation or submit the form data to a server here
        if (validateForm()==false) {
            return;
        }
        console.log(formData)
        
        const res = await addUser(formData);
    
        if (res.success === false) {
            setError(res.error);
            return;
        } else {
            window.location.reload();
        }   
    };



    return (
        <div className='flex justify-center  h-screen'>
            <div className='px-5 md:px-0 md:w-[25%] mt-12'>
                {/* logo */}
                <div className='mb-5 flex justify-center'>
                    <BiMoney size={40} />
                </div>
                {/* Heading */}
                <div className='space-y-2'>
                    <h2 className='text-xl md:text-3xl font-bold text-center'>Create an account</h2>
                    <p className='text-center'>Or <Link to='/login' className={`text-[#4338CA] font-semibold text-sm`}>login to your account</Link></p>
                </div>
                {error && <div className='bg-red-500 my-3 py-2 rounded'>
                    <p className='text-center text-white font-semibold'>{error}</p>
                </div>}
                <form className='mt-8 space-y-3' onSubmit={handleSubmit}>

        
                    <div className='form-group'>
                        <label htmlFor='name' className='input-label'>Name</label>
                        <input type="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange} className='input' placeholder='Mary' />
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor='employeeID' className='input-label'>Employee ID</label>
                        <input type="employeeID"
                            name="employeeID"
                            value={formData.employeeID}
                            onChange={handleChange} className='input' placeholder='123456' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email' className='input-label'>Email</label>
                        <input type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange} className='input' placeholder='joe@wellsfargo.com' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='designation' className='input-label'>Designation</label>
                        <input type="designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange} className='input' placeholder='Manager' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='department' className='input-label'>Department</label>
                        <input type="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange} className='input' placeholder='Technology' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='doj' className='input-label'>Date of Joining</label>
                        <input type="date"
                            name="doj"
                            value={formData.doj}
                            onChange={handleChange} className='input' placeholder='yyyy-mm-dd' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='dob' className='input-label'>Date of Birth</label>
                        <input type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange} className='input' placeholder='yyyy-mm-dd' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password' className='input-label'>Password</label>
                        <input type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange} className='input' />
                    </div>
                    <div className='form-group pb-3'>
                        <label htmlFor='password' className='input-label'>Confirm Password</label>
                        <input type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange} className='input'/>
                    </div>
                    <button className='bg-[#4338CA] long-button'>Create Account</button>
                </form>
                <div className='h-10'></div>

            </div>
        </div >
    )
};

// SignUp = withRouter(SignUp);//has to be used like this
export default SignUp;