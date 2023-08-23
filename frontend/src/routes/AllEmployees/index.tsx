import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DeletePopup } from 'components'
import Table from 'components/Table'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteEmployeeById, getEmployeesApi } from 'service/admin'


function AllEmployees() {
  const [data, setTableData] = useState<any[]>([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  function closePopup() {
    setPopupOpen(false)
  }

  const fields: any = [
    {
      key: "id",
      label: "Employee Id"
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "designation",
      label: "designation"
    },
    {
      key: "department",
      label: "department"
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
        navigate(`/admin/employee/edit/${data[id].id}`)

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


  useEffect(() => {
    getEmployees()
  }, [])

  async function getEmployees() {
    const resp = await getEmployeesApi()
    if (Object.keys(resp).length > 0) {
      setTableData(resp);
    }
    else {
      navigate("/NotFound")
    }
  }

  async function deleteEmployee() {
    const resp = await deleteEmployeeById(selectedId)
    if (resp == true) {
      alert("Employee Deleted sucessfully")
      window.location.reload()
    }
    else {
      alert("Some error occured")
    }
  }



  return (
    <div>
      {popupOpen && <DeletePopup closePopup={closePopup} onSubmit={deleteEmployee} />}
      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">
          <div className='flex gap-10 mb-5 justify-between'>
            <h1 className=" text-xl font-semibold">All Employees</h1>
            <Link to="/admin/employee/add"><button className={`bg-[#4338CA] normal-button`}>Add Employee</button></Link>
          </div>
          <Table fields={fields} data={data} actions={actions} />
        </div>
      </div>
    </div>
  )
}

export default AllEmployees