import { useState } from "react";

type FormType = {
  fields: {
    key: string;
    label: string;
  }[];
  data: any[];
  actions?: null | {label: string, onClick: (data: unknown)=>unknown}[];
};

const Table = ({ fields,data,actions }: FormType) => {
  
  return (
    <>
      <div className="w-full overflow-auto xl:overflow-visible">
        <table className="min-w-full">
            <thead className="text-base font-medium ">
                <tr>
                    {fields.map((field)=><td className="min-w-[80px] py-4 text-left">{field.label}</td>)}
                </tr>
            </thead>
            
            <tbody className="text-sm text-todayQ-black">
              {data.map((result, index) => (
                <tr key={index}>
                    {fields.map((field)=>(
                      <td className="py-4 px-2 text-left">{field.key!="actions"?result?.[field.key]:<div className="flex gap-4">{actions?.map((action)=><div onClick={()=>action.onClick(index)}>{action.label}</div>)}</div>}</td>
                    ))}
                </tr>
                
              ))}
            </tbody>
        </table>
        </div>
    </>
  );
};

export default Table;
