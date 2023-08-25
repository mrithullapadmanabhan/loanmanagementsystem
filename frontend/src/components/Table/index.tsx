export interface TablePropsType {
  fields: {
    key: string;
    label: string;
  }[];
  data: {
    [key: string]: string;
  }[];
  actions?: { label: string; buttonColor: string; onClick: (data: any) => void }[]
}

const Table = ({ fields, data, actions }: TablePropsType) => {
  return (
    <>
      <div className="w-full overflow-auto xl:overflow-visible">
        {data.length < 1 ? (
          <p>No records available.</p>
        ) : (
          <table className="min-w-full border-collapse border border-slate-400">
            <thead className="text-base font-medium ">
              <tr>
                {fields.map(({ label }) => (
                  <td
                    className="border border-slate-300 text-lg font-medium min-w-[80px] py-4 text-center"
                    key={label}
                  >
                    {label}
                  </td>
                ))}
              </tr>
            </thead>

            <tbody className="text-sm">
              {data.map((row, index) => (
                <tr key={index}>
                  {fields.map((field) => (
                    <td
                      className="border border-slate-300 py-4 px-2 text-center"
                      key={field.key}
                    >
                      {field.key !== "actions" ? (
                        row[field.key]
                      ) : (
                        <div className="flex gap-4 justify-center	">
                          {actions?.map((action) => (
                            <button
                              className={`bg-${action.buttonColor}-700 long-button`} // bg-green-700 or bg-red-700
                              onClick={() => action.onClick(row)}
                              key={action.label}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
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
