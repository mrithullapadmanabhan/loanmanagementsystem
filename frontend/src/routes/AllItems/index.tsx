import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from 'components/Sidebar'
import Table from 'components/Table'
import React, { useRef, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getItemsApi } from 'service/admin'


function AllItems() {
  const [data, setTableData] = useState<any[]>([
    {
      itemId: "1223445",
      name: "Table"
    }
  ])
  const fields: any=[
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
      key:"make",
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
  const actions: any=[
    {
      label: <FontAwesomeIcon icon={faPenToSquare} />,
      onClick: (id: any)=>{
        console.log(id)
      },
    },
    {
      label: <FontAwesomeIcon icon={faTrash} />,
      onClick: (id: any)=>{
        console.log(id)
      },
    }
  ]


  useEffect(()=>{
    getItems()
  },[])

  async function getItems(){
    const resp=await getItemsApi()
    const data=resp.map((itemcard: any) => ({
      ...itemcard,
      category: itemcard.make.category.name,
      make: itemcard.make.name
    }));
    setTableData(data);
  }

  return (
    <div>
      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">
    
          <div className='flex gap-10 mb-5 justify-between'>
            <h1 className=" text-xl font-semibold">All Itemcards</h1>
            <Link to="/admin/item/add"><Link to="/admin/item/add"><button className={`bg-[#4338CA] normal-button`}>Add ItemCard</button></Link></Link>
          </div>
          <Table fields={fields} data={data} actions={actions}/>
        </div>
      </div>
    </div>
  )
}

export default AllItems