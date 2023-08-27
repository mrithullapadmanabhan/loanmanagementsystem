import Form, { formPropsFieldsType } from "components/Form";

export interface AddEditPagePropsType {
  entityName: string;
  type: "add" | "edit";
  fields: formPropsFieldsType;
  handleSubmit: (data: any) => void;
}

const AddEditPage = ({
  entityName,
  type,
  fields,
  handleSubmit,
}: AddEditPagePropsType) => {
  const submitButton = {
    text: `${type === "add" ? "Add New" : "Edit"} ${entityName}`,
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="px-5 py-8 md:px-0 md:w-[25%] mt-12">
        <div className="space-y-2">
          <h2 className="text-xl md:text-3xl font-bold text-center">
            {" "}
            {type === "add" ? "Add" : "Edit"} {entityName}
          </h2>
        </div>
        <Form
          onSubmit={handleSubmit}
          formFields={fields}
          submitButton={submitButton}
        />
      </div>
    </div>
  );
};

export default AddEditPage;
