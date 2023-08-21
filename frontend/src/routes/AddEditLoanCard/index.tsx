import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getItemsCategories, getItemsMake } from "service/loan";
import {addLoanCardApi,getLoanCardById,updateLoanCardById} from 'service/admin'

function AddEditLoanCard({type="add"}) {
  const navigate = useNavigate();

  const [loanTypeData, setLoanTypeData] = useState<any[]>([]);
  const [duration, setDuration] = useState(0);
  const [selectItemCategory, setSelectItemCategory] = useState("");
  const {id}= useParams()


  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if(id=="" || id==undefined){
        return
    }
    getLoanCardData();
  }, [id]);

  async function getLoanCardData(){
    const res=getLoanCardById(id)

  }

  async function getCategories() {
    const res: any=await getItemsCategories()
    console.log(res)
    setLoanTypeData(res)
  }

  async function addSubmitButton() {
    const data={
      duration: duration,
      categoryID: selectItemCategory
    }
    const resp=await addLoanCardApi(data)
    if(resp){
      alert("Loan Card created successfully")
      navigate('/admin/loan-card/all')
    }
  }

  async function editSubmitButton() {
    const data={
      duration: duration,
      categoryID: selectItemCategory
    }
    const resp=await updateLoanCardById(id,data)
    if(resp){
      alert("Loan Card edited successfully")
      navigate('/admin/loan-card/all')
    }
  }

  const handleItemCategoryChange = async (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectItemCategory(e.target.value);
  };



  return (
    <>
    <div className="p-4 sm:p-7 md:p-8 lg:p-11 xl:p-12">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 xl:flex-row justify-start xl:justify-between xl:gap-0">
            <div className="flex flex-col justify-start gap-6 md:gap-8 lg:gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                        <p className="font-bold text-base sm:text-lg">
                            {type=="add"?"Add":"Edit"} an Loan card:
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-start gap-6 md:gap-7">
                    <div className="w-full md:w-48">
                        <p className="font-medium text-sm sm:text-base mb-2">
                            Select Item Category
                        </p>
                        <select 
                            className="w-full h-12 px-4 py-2 text-sm border border-gray-900 rounded appearance-none focus:ring focus:ring-gray-300 bg-white" 
                            value={selectItemCategory} 
                            onChange={handleItemCategoryChange}>
                            <option value="">Select Type</option>
                            {loanTypeData.map((loantype, index) => (
                                <option key={index} value={loantype.id}>
                                    {loantype.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap justify-start gap-6 md:gap-7">
                    <div className="w-full md:w-48">
                        <p className="font-medium text-sm sm:text-base mb-2">
                            Duration (In Months)
                        </p>
                        <input 
                            type="number" 
                            className="w-full h-12 px-4 py-2 text-sm border border-gray-900 rounded focus:ring focus:ring-gray-300" 
                            value={duration}                           
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-6 md:gap-7 mt-4">
                    <div className="w-full md:w-48">
                        <button
                            className="w-full h-12 text-center font-medium text-xs sm:text-sm py-2 px-8 rounded bg-[#00A141] text-white"
                            onClick={type=="add"?addSubmitButton:editSubmitButton}>
                            {type=="add"?"Add Loan card":"Edit Loan card"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </>
  );
}

export default AddEditLoanCard;
