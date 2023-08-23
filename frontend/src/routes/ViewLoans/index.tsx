import Table from 'components/Table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployeeLoansApi } from 'service/loan'


function ViewLoans() {
  const [tableData, setTableData] = useState<any[]>([])


  useEffect(() => {
    getLoans()
  }, [])
  const navigate = useNavigate()

  async function getLoans() {
    const resp = await getEmployeeLoansApi()
    setTableData(resp);

  }


  
  const fields: any = [
    {
      key: "id",
      label: "Loan Id"
    },
    {
      key: "status",
      label: "Issue Status"
    },
    {
      key: "item?.description",
      label: "Loan Category"
    },
    {
      key: "item?.make?.name",
      label: "Loan Duration"
    },
    {
      key: "issueDate",
      label: "Issue date"
    }
  ]

  return (
    <div>
      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">
          <h1 className=" text-xl font-semibold mb-5">Loan cards availed</h1>
          <Table fields={fields} data={tableData} />
        </div>
      </div>
    </div>
  )
}

export default ViewLoans