import { DeletePopup } from "components";
import Table from "components/Table";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface ListPagePropsType {
  entityName: string;
  entityNamePlural: string;
  removeItem?: (id: string) => void;
  action?: (id: string) => void;
  actionLabel?: string;
  editUrl: (id: string) => string;
  createUrl?: string;
  disableAdd?: boolean;
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
  action,
  actionLabel,
  editUrl,
  createUrl,
  disableAdd
}: ListPagePropsType) {
  const navigate = useNavigate();

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const actions = action ? [
    {
      label: actionLabel ? actionLabel : "",
      onClick: ({ id }: { id: string }) => {
        action(id);
      },
      buttonColor: "green",
    }
  ] : [
    {
      label: "Edit",
      onClick: ({ id }: { id: string }) => {
        navigate(editUrl(id));
      },
      buttonColor: "green",
    }
  ].concat(removeItem ? [
    {
      label: "Delete",
      onClick: ({ id }: { id: string }) => {
        setSelectedId(id);
        setPopupOpen(true);
      },
      buttonColor: "red",
    }
  ] : [])

  function deleteItem() {
    removeItem!(selectedId);
    setPopupOpen(false);
  }

  function closePopup() {
    setPopupOpen(false);
  }

  return (
    <div>
      {popupOpen && (
        <DeletePopup closePopup={closePopup} onSubmit={deleteItem} entityName={entityName} />
      )}

      <div className="p-6 sm:p-8 md:p-11 flex flex-col gap-12">
        <div className="w-full flex flex-col justify-center gap-4 mb-6 lg:mb-0">
          <div className="flex gap-10 mb-10 justify-between">
            <h1 className="text-3xl font-semibold">{entityNamePlural}</h1>
            {!disableAdd && <Link to={createUrl ? createUrl : `/admin/${entityName}/create`}>
              <button className="bg-blue-900 dark:bg-gray-900 normal-button py-2 px-4">
                Add {entityName}
              </button>
            </Link>}
          </div>
          <Table fields={fields} data={data} actions={actions} />
        </div>
      </div>
    </div>
  );
}

export default ListPage;
