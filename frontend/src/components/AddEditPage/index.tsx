import Form, { formPropsFieldsType } from "components/Form";

export interface AddEditPagePropsType {
  entityName: string;
  type: "add" | "edit";
  fields: formPropsFieldsType;
  handleSubmit: (data: any) => void;
  verb?: string
}

const AddEditPage = ({
  entityName,
  type,
  fields,
  handleSubmit,
  verb
}: AddEditPagePropsType) => {
  const submitButton = {
    text: `${verb ? verb : (type === "add" ? "Add New" : "Edit")} ${entityName}`,
  };

  return (
    <div className="flex justify-center">
      <div className="px-5 py-8 md:px-0 w-[80%] sm:w-[50%] md:w-[30%] my-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-center">
            {" "}
            {verb ? verb : (type === "add" ? "Add" : "Edit")} {entityName}
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
