import Sidebar from 'components/Sidebar'
import React, { useRef, useContext, useEffect, useState } from 'react'
import { getEmployeeLoansApi } from 'service/loan'


function ViewLoans() {
  const [tableData, setTableData] = useState<any[]>([])


  useEffect(()=>{
    getLoans()
  },[])

  async function getLoans(){
    const resp=await getEmployeeLoansApi()
    setTableData(resp)
  }

  return (
    <div>
      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">
          <h1 className=" text-xl font-semibold mb-5">Loan cards availed</h1>
          <div className="w-full overflow-auto xl:overflow-visible">
            <table className="min-w-full">
              <thead className="text-base font-medium ">
                <tr>
                  <td className="min-w-[80px] py-4 text-left">Loan Id</td>
                  <td className="min-w-[100px] py-4 px-2 text-left">
                    Loan Category
                  </td>
                  <td className="min-w-[110px] py-4 px-2 text-left">
                    Duration
                  </td>
                  <td className="min-w-[70px] py-4 px-2 text-left">
                    Issue Date
                  </td>
                </tr>
              </thead>
              
                  <tbody className="text-sm text-todayQ-black">
                  {tableData.map((result, index) => (
                    <tr key={index}>
                      <td className="text-left">{result?.id}</td>
                      <td className="text-black py-4 px-2 text-left">{result?.loan?.category?.name}</td>
                      <td className="py-4 px-2 text-left">{result?.loan?.duration}</td>
                      <td className="py-4 px-2 text-left">{result?.issueDate}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewLoans