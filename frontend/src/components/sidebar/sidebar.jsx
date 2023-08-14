import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faMoneyBillWave,
  faCog,
} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthUserContext from '../../authentication/AuthUserContext'


function Sidebar() {
  
  const navigate = useNavigate()
  const [options,setOptions]=useState([])
  const authUser=useContext(AuthUserContext)

  const analystOptions = [
    { label: 'View Loans', Icon: faHome, route: '/view-loans' },
    { label: 'View Items Purchased', Icon: faCog, route: '/new-trade' },
    { label: 'Apply for loan', Icon: faMoneyBillWave, route: '/current-trades' },
  ]
  
  const adminOptions = [
    { label: 'View Loans', Icon: faHome, route: '/dashboard' },
    { label: 'View Items Purchased', Icon: faCog, route: '/new-trade' },
    { label: 'Apply for loan', Icon: faMoneyBillWave, route: '/current-trades' },
  ]

  const [type,setType]=useState('')
  

  useEffect(()=>{
    console.log("sidebar",authUser)
    if(authUser){
        setType(authUser.userType.charAt(0).toUpperCase()+authUser.userType.slice(1))
        if(authUser?.userType=='admin'){
            setOptions(adminOptions)
        }
        else if(authUser?.userType=='employee'){
            setOptions(analystOptions)
        }
    }
  },[authUser])

  return (
    <div>
        <div className="h-full w-full  z-10 sm:w-[240px] py-10 bg-gray-100 font-poppins flex flex-col items-center gap-16  fixed top-0 left-0 transition-transform translate-x-0 ease-in-out">
          <h1 className="font-bold text-lg text-center text-todayQ-black whitespace-pre">
            {type} Portal
          </h1>

          <div className="flex flex-col justify-start gap-10">
            {options.map((option, index) => {
              return (
                <div
                  key={index}
                  className={`flex justify-start items-center cursor-pointer space-x-4 hover:text-todayQ-green`}
                  onClick={() => {
                    navigate(option.route) // navigate to route
                  }}
                >
                  <FontAwesomeIcon icon={option.Icon} size="sm" />
                  <span
                    className="text-sm font-medium">
                    {option.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default Sidebar