import { DeletePopup } from "components";
import Table from "components/Table";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface ListPagePropsType {
  entityName: string;
  entityNamePlural: string;
  removeItem: (id: string) => void;
  editUrl: (id: string) => string;
  fields: {
    key: string;
    label: string;
  }[];
  data: {
    [key: string]: string;
  }[];
}

function ListPage({
  entityName,
  entityNamePlural,
  fields,
  data,
  removeItem,
  editUrl,
}: ListPagePropsType) {
  const navigate = useNavigate();

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const actions = [
    {
      label: "Edit",
      onClick: ({ id }: { id: string }) => {
        navigate(editUrl(id));
      },
      buttonColor: "green",
    },
    {
      label: "Delete",
      onClick: ({ id }: { id: string }) => {
        setSelectedId(id);
        setPopupOpen(true);
      },
      buttonColor: "red",
    },
  ];

  function deleteItem() {
    removeItem(selectedId);
    setPopupOpen(false);
  }

  function closePopup() {
    setPopupOpen(false);
  }

  return (
    <div>
      {popupOpen && (
        <DeletePopup closePopup={closePopup} onSubmit={deleteItem} />
      )}

      <div className="p-4 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full  flex flex-col justify-center gap-4 mb-6 lg:mb-0">
          <div className="flex gap-10 mb-5 justify-between">
            <h1 className="text-5xl font-semibold">{entityNamePlural}</h1>
            <Link to="/admin/item/add">
              <Link to="/admin/item/add">
                <button className={`bg-indigo-700 normal-button`}>
                  Add {entityName}
                </button>
              </Link>
            </Link>
          </div>
          <Table fields={fields} data={data} actions={actions} />
        </div>
      </div>
    </div>
  );
}

export default ListPage;
