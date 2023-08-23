import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployeeLoansApi } from 'service/loan'


function ViewEmployeeItems() {
  const [tableData, setTableData] = useState<any[]>([])


  useEffect(() => {
    getLoans()
  }, [])

  const navigate = useNavigate()
  async function getLoans() {
    const resp = await getEmployeeLoansApi()
    if (Object.keys(resp).length > 0) {
      setTableData(resp);
    }
    else {
      navigate("/NotFound")
    }
  }

  return (
    <div>
      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">
          <h1 className=" text-xl font-semibold mb-5">Items Purchased</h1>
          <div className="w-full overflow-auto xl:overflow-visible">
            <table className="min-w-full">
              <thead className="text-base font-medium ">
                <tr>
                  <td className="min-w-[80px] py-4 text-left">Issue Id</td>
                  <td className="min-w-[80px] py-4 text-left">Item Description</td>
                  <td className="min-w-[100px] py-4 px-2 text-left">
                    Item Make
                  </td>
                  <td className="min-w-[110px] py-4 px-2 text-left">
                    Item Category
                  </td>
                  <td className="min-w-[70px] py-4 px-2 text-left">
                    Item Valuation
                  </td>
                </tr>
              </thead>

              <tbody className="text-sm text-todayQ-black">
                {tableData.map((result, index) => (
                  <tr key={index}>
                    <td className="text-left">{result?.id}</td>

                    <td className="text-left">{result?.item?.description}</td>
                    <td className="text-black py-4 px-2 text-left">{result?.item?.make?.name}</td>
                    <td className="py-4 px-2 text-left">{result?.item?.make?.category?.name}</td>
                    <td className="py-4 px-2 text-left">{result?.item?.value}</td>
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

export default ViewEmployeeItems