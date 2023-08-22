import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMakeApi, getMakeById, updateMakeById } from 'service/admin';
import { getItemsCategories } from "service/loan";

function AddEditMake({ type = "add" }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);
  const [makeName, setMakeName] = useState("");
  const [selectMakeCategory, setSelectMakeCategory] = useState("");
  const { id } = useParams()


  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (id == "" || id == undefined) {
      return
    }
    getMakeData();
  }, [id]);

  async function getMakeData() {
    const res: any = await getMakeById(id)
    setMakeName(res.name)
  }

  async function getCategories() {
    const res: any = await getItemsCategories()
    console.log(res)
    setCategories(res)
  }

  async function addSubmitButton() {
    const data = {
      name: makeName,
      categoryID: selectMakeCategory
    }
    const resp = await addMakeApi(data)
    if (resp) {
      alert("Make created successfully")
      navigate('/admin/make/all')
    }
    else {
      alert("Invalid Credentials")
    }
  }

  async function editSubmitButton() {
    const data = {
      name: makeName,
      categoryID: selectMakeCategory
    }
    const resp = await updateMakeById(id, data)
    if (resp) {
      alert("Make edited successfully")
      navigate('/admin/make/all')
    }
    else {
      alert("error")
    }
  }

  const handleMakeCategoryChange = async (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectMakeCategory(e.target.value);
  };



  return (
    <>
      <div className="p-4 sm:p-7 md:p-8 lg:p-11 xl:p-12">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 xl:flex-row justify-start xl:justify-between xl:gap-0">
          <div className="flex flex-col justify-start gap-6 md:gap-8 lg:gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <p className="font-bold text-base sm:text-lg">
                  {type == "add" ? "Add" : "Edit"} a make:
                </p>
              </div>
            </div>

            <div
              className="flex flex-wrap justify-start gap-6 md:gap-7">
              <div className="w-full md:w-48">
                <p hidden={type == "add" ? false : true}
                  className="font-medium text-sm sm:text-base mb-2">
                  Select Make Category
                </p>
                <select hidden={type == "add" ? false : true}
                  className="w-full h-12 px-4 py-2 text-sm border border-gray-900 rounded appearance-none focus:ring focus:ring-gray-300 bg-white"
                  value={selectMakeCategory}
                  onChange={handleMakeCategoryChange}>
                  <option value="">Select Type</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap justify-start gap-6 md:gap-7">
              <div className="w-full md:w-48">
                <p className="font-medium text-sm sm:text-base mb-2">
                  Make Name
                </p>
                <input
                  type="text"
                  className="w-full h-12 px-4 py-2 text-sm border border-gray-900 rounded focus:ring focus:ring-gray-300"
                  value={makeName}
                  onChange={(e) => setMakeName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-6 md:gap-7 mt-4">
              <div className="w-full md:w-48">
                <button
                  className="w-full h-12 text-center font-medium text-xs sm:text-sm py-2 px-8 rounded bg-[#00A141] text-white"
                  onClick={type == "add" ? addSubmitButton : editSubmitButton}>
                  {type == "add" ? "Add Make" : "Edit Make"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEditMake;
