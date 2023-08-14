import AuthUserContext from 'authentication/AuthUserContext';
import Sidebar from 'components/sidebar/sidebar';
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function ApplyLoan() {
 

  const authuser = useContext(AuthUserContext)

  const navigate = useNavigate();

  const [loanTypeData,setLoanTypeData]=useState([])
  const [itemMakeData,setItemMakeData]=useState([])
  const [itemValue,setItemValue]=useState('')
  const [employeeId,setEmployeeId]=useState('')
  const [description,setDescription]=useState('')
  const [selectItemMake,setSelectItemMake]=useState('')
  const [selectItemCategory,setSelectItemCategory]=useState('')


  function submitButton(){

  }


 
  return (
    <>
      <div
        className='overflow-hidden  ml-0   sm:ml-[240px]'>
        <Sidebar />

        <div className="p-7 sm:p-8 md:p-11">
          <div className="flex flex-col gap-8  xl:flex-row justify-start md:gap-12  xl:justify-between xl:gap-0">
            <div className="hidden lg:flex flex-col justify-start gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <p className="font-medium text-sm text-todayQ-black">
                    Apply for loan:
                  </p>
                </div>
              </div>
              <div className="flex justify-start gap-7">
                <div className="">
                  <p className="font-medium text-sm text-todayQ-black mb-2">
                    Select Item Category
                  </p>
                  <select
                    className="w-full lg:w-48 h-12 px-4 text-sm text-todayQ-black border border-gray-900 rounded appearance-none"
                    value={selectItemCategory}
                    onChange={(e) => setSelectItemCategory(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    {loanTypeData.map((loantype, index) => (
                      <option key={index} value={loantype}>
                        {loantype}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-start gap-7">
                <div className="">
                  <p className="font-medium text-sm text-todayQ-black mb-2">
                    Select Item Make
                  </p>
                  <select
                    className="w-full lg:w-48 h-12 px-4 text-sm text-todayQ-black border border-gray-900 rounded appearance-none"
                    value={selectItemMake}
                    onChange={(e) => setSelectItemMake(e.target.value)}
                  >
                    <option value="">Select Item</option>
                    {itemMakeData.map((itemMake, index) => (
                      <option key={index} value={itemMake}>
                        {itemMake}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-start gap-7">
                <div className="">
                  <p className="font-medium text-sm text-todayQ-black mb-2">
                    Employee Id
                  </p>
                  <input
                    type="text"
                    className="w-full lg:w-48 h-12 px-4 text-sm text-todayQ-black border border-gray-900 rounded"
                    value={employeeId}
                    disabled
                  />
                </div>
                <div className="">
                  <p className="font-medium text-sm text-todayQ-black mb-2">
                    Item Description
                  </p>
                  <input
                    type="text"
                    className="w-full lg:w-48 h-12 px-4 text-sm text-todayQ-black border border-gray-900 rounded"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="">
                  <p className="font-medium text-sm text-todayQ-black mb-2">
                    Item Value
                  </p>
                  <input
                    type="text"
                    className="w-full lg:w-48 h-12 px-4 text-sm text-todayQ-black border border-gray-900 rounded"
                
                    value={itemValue}
                    disabled
                  />
                </div>
              </div>
    
              <div className="flex justify-start gap-7">
                
                <div className="self-end">
                  <button
                    className={`w-full lg:w-48 h-12  text-center font-medium text-xs py-2 px-8 rounded bg-[#00A141] text-white'`}
                    onClick={submitButton}
                  >
                    Apply Loan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplyLoan