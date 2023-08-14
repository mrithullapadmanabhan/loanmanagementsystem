import React, { useState } from 'react'
import { addUser } from '../../service/api';
import { Link } from 'react-router-dom';
// import { withRouter } from '../../authentication/withRouter';
import { BiMoney } from 'react-icons/bi'




function SignUp() {

    const [formData, setFormData] = useState({
        
        email: "",
        password: '',
        confirm_password: '',
        userType: 'employee',
        emp: {
            dob: "",
            doj: '',
            username: "",
            department:'',
            gender: "",
            designation: "",
            name: '',
            employeeID: '' 
        },
    });
    const [error, setError] = useState("");

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    
    const handleChangeEmp = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            emp: {
                ...prevData.emp,
                [name]: value
            }
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
            setError(res.message);
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
                            value={formData.emp.name}
                            onChange={handleChangeEmp} className='input' placeholder='Mary' />
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor='username' className='input-label'>Username</label>
                        <input type="name"
                            name="username"
                            value={formData.emp.username}
                            onChange={handleChangeEmp} className='input' placeholder='Mary12' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='employeeID' className='input-label'>Employee ID</label>
                        <input type="employeeID"
                            name="employeeID"
                            value={formData.emp.employeeID}
                            onChange={handleChangeEmp} className='input' placeholder='123456' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email' className='input-label'>Email</label>
                        <input type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange} className='input' placeholder='joe@wellsfargo.com' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='gender' className='input-label'>Gender</label>
                        <select name="gender" value={formData.emp.gender} onChange={handleChangeEmp} className='input'>
                            <option value={""} disabled hidden>Select Gender</option>
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                            <option value={"other"}>Other</option>

                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='designation' className='input-label'>Designation</label>
                        <input type="designation"
                            name="designation"
                            value={formData.emp.designation}
                            onChange={handleChangeEmp} className='input' placeholder='Manager' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='department' className='input-label'>Department</label>
                        <input type="department"
                            name="department"
                            value={formData.emp.department}
                            onChange={handleChangeEmp} className='input' placeholder='Technology' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='doj' className='input-label'>Date of Joining</label>
                        <input type="date"
                            name="doj"
                            value={formData.emp.doj}
                            onChange={handleChangeEmp} className='input' placeholder='yyyy-mm-dd' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='dob' className='input-label'>Date of Birth</label>
                        <input type="date"
                            name="dob"
                            value={formData.emp.dob}
                            onChange={handleChangeEmp} className='input' placeholder='yyyy-mm-dd' />
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