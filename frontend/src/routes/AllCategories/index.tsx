import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DeletePopup } from 'components'
import Table from 'components/Table'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCategoryById, getCategoriesApi } from 'service/admin'


function AllCategories() {
  const [data, setTableData] = useState<any[]>([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  function closePopup() {
    setPopupOpen(false)
  }
  const fields: any = [
    {
      key: "id",
      label: "Category ID"
    },
    {
      key: "name",
      label: "Category Name"
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
        navigate(`/admin/category/edit/${data[id].id}`)

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
    getCategories()
  }, [])

  async function getCategories() {
    const resp = await getCategoriesApi()
    const data = resp.map((category: any) => ({
      ...category,
      id: category.id,
      name: category.name
    }));
    setTableData(data);

  }

  async function deleteCategory() {
    const resp = await deleteCategoryById(selectedId)
    if (resp == true) {
      alert("Category Deleted sucessfully")
      window.location.reload()
    }
    else {
      alert("Some error occured")
    }
  }

  return (
    <div>
      {popupOpen && <DeletePopup closePopup={closePopup} onSubmit={deleteCategory} />}
      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">

          <div className='flex gap-10 mb-5 justify-between'>
            <h1 className=" text-xl font-semibold">All Categories</h1>
            <Link to="/admin/category/add"><Link to="/admin/category/add"><button className={`bg-[#4338CA] normal-button`}>Add Category</button></Link></Link>
          </div>
          <Table fields={fields} data={data} actions={actions} />
        </div>
      </div>
    </div>
  )
}

export default AllCategories;