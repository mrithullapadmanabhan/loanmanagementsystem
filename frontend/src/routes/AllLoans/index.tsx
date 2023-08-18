import Sidebar from 'components/Sidebar'
import Table from 'components/Table'
import React, { useRef, useContext, useEffect, useState } from 'react'
import { getLoansApi } from 'service/admin'


function AllLoans() {
  const [data, setTableData] = useState<any[]>([
    {
      id: "1223445",
      category: "Furniture",
      duration:"5"
    }
  ])
  const fields: any=[
    {
      key: "id",
      label: "loanId"
    },
    {
      key:"category",
      label: "loanType"
    },
    {
        key:"duration",
        label: "duration"
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
    getLoans()
  },[])

  async function getLoans(){
    const resp=await getLoansApi()
    const data=resp.map((loancard: any) => ({
      ...loancard,
      category: loancard.category.name
    }));
    setTableData(data);
  }

  return (
    <div>
      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">
    
          <div className='flex gap-10 mb-5 justify-between'>
            <h1 className=" text-xl font-semibold">All Loans</h1>
            <button className={`bg-[#4338CA] normal-button`}>Add Loan</button>
          </div>
          <Table fields={fields} data={data} actions={actions}/>
        </div>
      </div>
    </div>
  )
}

export default AllLoans