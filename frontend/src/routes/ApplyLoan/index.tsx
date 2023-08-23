import { useSnackbar } from "components/Snackbar";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { applyLoanApi, getItemsCategories, getItemsFromMake, getItemsMake } from "service/loan";

function ApplyLoan() {
  const navigate = useNavigate();

  const [loanTypeData, setLoanTypeData] = useState<any[]>([]);
  const [itemMakeData, setItemMakeData] = useState<any[]>([]);
  const [itemValue, setItemValue] = useState("");
  const employeeId=localStorage.getItem("employeeID");

  const [description, setDescription] = useState("");
  const [selectItemMake, setSelectItemMake] = useState("");
  const [selectItemCategory, setSelectItemCategory] = useState("");

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const res: any=await getItemsCategories()
    console.log(res)
    setLoanTypeData(res)
  }
  
  const showSnackBar=useSnackbar()

  async function submitButton() {
    const data={
      'makeID': selectItemMake,
      'employeeID': employeeId
    }
    const resp=await applyLoanApi(data)
    if(resp){
      showSnackBar("Loan created successfully","success")
      navigate('/loans')
    }
  }

  const handleItemCategoryChange = async (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectItemCategory(e.target.value);
    const res: any= await getItemsMake(e.target.value)
    setItemMakeData(res);
  };

  const handleMakeChange= async(e: any)=>{
    setSelectItemMake(e.target.value)
    console.log(e.target.value)
    const res: any=await getItemsFromMake(e.target.value)
    console.log(res)
    setDescription(res?.description)
    setItemValue(res?.value)
  }

  return (
    <>
    <div className="p-4 sm:p-7 md:p-8 lg:p-11 xl:p-12">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 xl:flex-row justify-start xl:justify-between xl:gap-0">
            <div className="flex flex-col justify-start gap-6 md:gap-8 lg:gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                        <p className="font-bold text-base sm:text-lg">
                            Apply for loan:
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-start gap-6 md:gap-7">
                    <div className="w-full">
                        <p className="font-medium text-sm sm:text-base mb-2">
                            Employee Id: {employeeId}
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
                    <div className="w-full md:w-48">
                        <p className="font-medium text-sm sm:text-base mb-2">
                            Select Item Make
                        </p>
                        <select 
                            className="w-full h-12 px-4 py-2 text-sm border border-gray-900 rounded appearance-none focus:ring focus:ring-gray-300 bg-white" 
                            value={selectItemMake} 
                            onChange={handleMakeChange}
                        >
                            <option value="">Select Item</option>
                            {itemMakeData.map((itemMake, index) => (
                                <option key={index} value={itemMake.id}>
                                    {itemMake.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap justify-start gap-6 md:gap-7">
                    <div className="w-full md:w-48">
                        <p className="font-medium text-sm sm:text-base mb-2">
                            Item Description
                        </p>
                        <input 
                            type="text" 
                            disabled
                            className="w-full h-12 px-4 py-2 text-sm border border-gray-900 rounded focus:ring focus:ring-gray-300" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <p className="font-medium text-sm sm:text-base mb-2">
                            Item Value
                        </p>
                        <input 
                            type="text" 
                            className="w-full h-12 px-4 py-2 text-sm border border-gray-900 rounded focus:ring focus:ring-gray-300" 
                            value={itemValue} 
                            disabled
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-6 md:gap-7 mt-4">
                    <div className="w-full md:w-48">
                        <button
                            className="w-full h-12 text-center font-medium text-xs sm:text-sm py-2 px-8 rounded bg-[#00A141] text-white"
                            onClick={submitButton}>
                            Apply Loan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </>
  );
}

export default ApplyLoan;
