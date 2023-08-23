import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DeletePopup } from 'components'
import Table from 'components/Table'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteLoanCardById, getLoansApi } from 'service/admin'


function AllLoans() {
  const [data, setTableData] = useState<any[]>([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  function closePopup() {
    setPopupOpen(false)
  }
  const fields: any = [
    {
      key: "id",
      label: "loanId"
    },
    {
      key: "category",
      label: "loanType"
    },
    {
      key: "duration",
      label: "duration"
    },
    {
      key: "actions",
      label: "Actions"
    }
  ]
  const navigate = useNavigate()
  const actions: any = [
    {
      label: <FontAwesomeIcon icon={faPenToSquare} />,
      onClick: (id: any) => {
        console.log(id)
        navigate(`/admin/loan-card/edit/${data[id].id}`)

      },
    },
    {
      label: <FontAwesomeIcon icon={faTrash} />,
      onClick: (id: any) => {
        console.log(id)
        setSelectedId(data[id].id)
        setPopupOpen(true)
      },
    }
  ]

  async function deleteLoanCard() {
    const resp = await deleteLoanCardById(selectedId)
    if (resp == true) {
      alert("Loan card Deleted sucessfully")
      window.location.reload()
    }
    else {
      alert("Some error occured")
    }
  }



  useEffect(() => {
    getLoans()
  }, [])

  async function getLoans() {
    const resp = await getLoansApi()
    const data = resp.map((loancard: any) => ({
      ...loancard,
      category: loancard.category.name
    }));
    setTableData(data);


  }

  return (
    <div>
      {popupOpen && <DeletePopup closePopup={closePopup} onSubmit={deleteLoanCard} />}

      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">

          <div className='flex gap-10 mb-5 justify-between'>
            <h1 className=" text-xl font-semibold">All Loans</h1>
            <Link to='/admin/loan-card/add'><button className={`bg-[#4338CA] normal-button`}>Add Loan</button></Link>
          </div>
          <Table fields={fields} data={data} actions={actions} />
        </div>
      </div>
    </div>
  )
}

export default AllLoans