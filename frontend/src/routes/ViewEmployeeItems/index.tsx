import Table from 'components/Table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployeeLoansApi } from 'service/loan'


function ViewEmployeeItems() {
  const [tableData, setTableData] = useState<any[]>([])


  useEffect(() => {
    getLoans()
  }, [])


  const fields: any = [
    {
      key: "id",
      label: "Issue Id"
    },
    {
      key: "item?.description",
      label: "Item Description"
    },
    {
      key: "item?.make?.name",
      label: "Item Make"
    },
    {
      key: "item?.make?.category?.name",
      label: "Item Category"
    },
    {
      key: "item?.value",
      label: "Item Valuation"
    }
  ]


  

  const navigate = useNavigate()
  async function getLoans() {
    const resp = await getEmployeeLoansApi()
    setTableData(resp);

  }

  return (
    <div>
      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">
          <h1 className=" text-xl font-semibold mb-5">Items Purchased</h1>
          <Table fields={fields} data={tableData} />
        </div>
      </div>
    </div>
  )
}

export default ViewEmployeeItems