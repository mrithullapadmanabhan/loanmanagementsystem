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
    <div className="w-full overflow-auto">
      {data.length < 1 ? (
        <p>No records available.</p>
      ) : (
        <table className="min-w-full border-collapse border border-slate-400 table-auto">
          <thead className="text-base font-medium ">
            <tr>
              {fields.map(({ label }) => (
                <td
                  className="border border-slate-300 text-lg font-medium min-w-[80px] py-2 px-4 text-center"
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
                    className="border whitespace-nowrap border-slate-300 py-2 px-4 text-center"
                    key={field.key}
                  >
                    {field.key !== "actions" ? (
                      row[field.key]
                    ) : (
                      <div className="flex gap-4 justify-center	px-2">
                        {actions?.map((action) => (
                          <button
                            className={`bg-${action.buttonColor}-700 long-button px-3`} // bg-green-700 or bg-red-700
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
  );
};

export default Table;
