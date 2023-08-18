import Sidebar from 'components/Sidebar'
import Table from 'components/Table'
import React, { useRef, useContext, useEffect, useState } from 'react'
import { getEmployeesApi } from 'service/admin'


function AllEmployees() {
  const [data, setTableData] = useState<any[]>([
    {
      employeeId: "1223445",
      name: "Yash Goel"
    }
  ])
  const fields: any=[
    {
      key: "employeeId",
      label: "Employee Id"
    },
    {
      key:"name",
      label: "Name"
    },
    {
      key: "actions",
      label: "Actions"
    }
  ]
  const actions: any=[
    {
      label: "Edit",
      onClick: ()=>{},
    },
    {
      label: "Delete",
      onClick: ()=>{}
    }
  ]


  useEffect(()=>{
    getEmployees()
  },[])

  async function getEmployees(){
    const resp=await getEmployeesApi()
    // setTableData(resp)
  }

  return (
    <div>
      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">
          <div className='flex gap-10 mb-5 justify-between'>
            <h1 className=" text-xl font-semibold">All Employees</h1>
            <button className={`bg-[#4338CA] normal-button`}>Add Employee</button>
          </div>
          <Table fields={fields} data={data} actions={actions}/>
        </div>
      </div>
    </div>
  )
}

export default AllEmployees