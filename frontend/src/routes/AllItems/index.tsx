import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DeletePopup } from 'components'
import Table from 'components/Table'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteItemById, getItemsApi } from 'service/admin'


function AllItems() {
  const [data, setTableData] = useState<any[]>([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  function closePopup() {
    setPopupOpen(false)
  }
  const fields: any = [
    {
      key: "id",
      label: "Item Id"
    },
    {
      key: "description",
      label: "description"
    },
    {
      key: "value",
      label: "value"
    },
    {
      key: "make",
      label: "make"
    },
    {
      key: "category",
      label: "category"
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
        navigate(`/admin/item/edit/${data[id].id}`)

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
    getItems()
  }, [])

  async function getItems() {
    const resp = await getItemsApi()
    const data = resp.map((itemcard: any) => ({
      ...itemcard,
      category: itemcard?.make?.category?.name,
      make: itemcard?.make?.name
    }));
    setTableData(data);

  }

  async function deleteItem() {
    const resp = await deleteItemById(selectedId)
    if (resp == true) {
      alert("Item Deleted sucessfully")
      window.location.reload()
    }
    else {
      alert("Some error occured")
    }
  }

  return (
    <div>
      {popupOpen && <DeletePopup closePopup={closePopup} onSubmit={deleteItem} />}
      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">

          <div className='flex gap-10 mb-5 justify-between'>
            <h1 className=" text-xl font-semibold">All Itemcards</h1>
            <Link to="/admin/item/add"><Link to="/admin/item/add"><button className={`bg-[#4338CA] normal-button`}>Add ItemCard</button></Link></Link>
          </div>
          <Table fields={fields} data={data} actions={actions} />
        </div>
      </div>
    </div>
  )
}

export default AllItems