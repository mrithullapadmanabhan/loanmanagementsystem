import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DeletePopup } from 'components'
import Table from 'components/Table'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteMakeById, getMakesApi } from 'service/admin'


function AllMakes() {
  const [data, setTableData] = useState<any[]>([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  function closePopup() {
    setPopupOpen(false)
  }
  const fields: any = [
    {
      key: "id",
      label: "makeId"
    },
    {
      key: "category",
      label: "category"
    },
    {
      key: "name",
      label: "name"
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
        navigate(`/admin/make/edit/${data[id].id}`)

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

  async function deleteMake() {
    const resp = await deleteMakeById(selectedId)
    if (resp == true) {
      alert("Make Deleted sucessfully")
      window.location.reload()
    }
    else {
      alert("Some error occured")
    }
  }



  useEffect(() => {
    getMakes()
  }, [])

  async function getMakes() {
    const resp = await getMakesApi()
    const data = resp.map((make: any) => ({
      ...make,
      category: make.category.name
    }));
    setTableData(data);

  }

  return (
    <div>
      {popupOpen && <DeletePopup closePopup={closePopup} onSubmit={deleteMake} />}

      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">

          <div className='flex gap-10 mb-5 justify-between'>
            <h1 className=" text-xl font-semibold">All Makes</h1>
            <Link to='/admin/make/add'><button className={`bg-[#4338CA] normal-button`}>Add Make</button></Link>
          </div>
          <Table fields={fields} data={data} actions={actions} />
        </div>
      </div>
    </div>
  )
}

export default AllMakes;