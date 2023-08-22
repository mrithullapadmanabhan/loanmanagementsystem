import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCategoryApi, getCategoryById, updateCategoryById } from 'service/admin';

function AddEditCategory({ type = "add" }) {
  const navigate = useNavigate();

  const [categoryname, setCategoryName] = useState("");

  const { id } = useParams()


  //   useEffect(() => {
  //     getCategories();
  //   }, []);


  useEffect(() => {
    if (id == "" || id == undefined) {
      return
    }
    getCategoryData();
  }, [id]);

  async function getCategoryData() {
    const res = await getCategoryById(id)
    setCategoryName(res.name)
  }


  async function addSubmitButton() {
    const data = {
      name: categoryname
    }
    const resp = await addCategoryApi(data)
    if (resp) {
      alert("Category created successfully")
      navigate('/admin/category/all')
    }
    else {
      alert("Invalid Credentials")
    }
  }

  async function editSubmitButton() {
    const data = {
      name: categoryname
    }
    const resp = await updateCategoryById(id, data)
    if (resp) {
      alert("Category edited successfully")
      navigate('/admin/category/all')
    }
    else {
      alert("Invalid Credentials");
    }
  }

  return (
    <>
      <div className="p-4 sm:p-7 md:p-8 lg:p-11 xl:p-12">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 xl:flex-row justify-start xl:justify-between xl:gap-0">
          <div className="flex flex-col justify-start gap-6 md:gap-8 lg:gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <p className="font-bold text-base sm:text-lg">
                  {type == "add" ? "Add" : "Edit"} a Category:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-start gap-6 md:gap-7">
              <div className="w-full md:w-48">
                <p className="font-medium text-sm sm:text-base mb-2">
                  Category Name
                </p>
                <input
                  type="text"
                  className="w-full h-12 px-4 py-2 text-sm border border-gray-900 rounded focus:ring focus:ring-gray-300"
                  value={categoryname}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-6 md:gap-7 mt-4">
              <div className="w-full md:w-48">
                <button
                  className="w-full h-12 text-center font-medium text-xs sm:text-sm py-2 px-8 rounded bg-[#00A141] text-white"
                  onClick={type == "add" ? addSubmitButton : editSubmitButton}>
                  {type == "add" ? "Add Category" : "Edit Category"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEditCategory;
