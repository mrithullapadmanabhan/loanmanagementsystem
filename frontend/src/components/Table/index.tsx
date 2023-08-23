
type FormType = {
  fields: {
    key: string;
    label: string;
  }[];
  data: any[];
  actions?: null | { label: string, onClick: (data: unknown) => unknown }[];
};

const Table = ({ fields, data, actions }: FormType) => {

  return (
    <>
      <div className="w-full overflow-auto xl:overflow-visible">
        {data.length < 1 ? (
          <p>No records available.</p>
        ) : (

          <table className="min-w-full border-collapse border border-slate-400">
            <thead className="text-base font-medium ">
              <tr>
                {fields.map((field) => <td className="border border-slate-300 text-lg font-medium min-w-[80px] py-4 text-center">{field.label}</td>)}
              </tr>
            </thead>

            <tbody className="text-sm">
              {data.map((result, index) => (
                <tr key={index}>
                  {fields.map((field) => (
                    <td className="border border-slate-300 py-4 px-2 text-center">{field.key != "actions" ? result?.[field.key] : <div className="flex gap-4 justify-center	">{actions?.map((action) => <div onClick={() => action.onClick(index)}>{action.label}</div>)}</div>}</td>
                  ))}
                </tr>

              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Table;
