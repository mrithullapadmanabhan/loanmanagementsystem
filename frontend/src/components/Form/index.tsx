import { useEffect, useState } from "react";

interface formFieldsType {
  label: string;
  regex: string | null;
  errorMessage: string | null;
  initialData: string | number;
  placeholder: string;
  disabled: boolean;
}

interface formFieldsTypeInput extends formFieldsType {
  type: "text" | "date" | "password";
}

interface formFieldsTypeSelect extends formFieldsType {
  type: "select";
  options: { value: string; label: string }[];
}

export type formPropsFieldsType = {
  [name: string]: formFieldsTypeInput | formFieldsTypeSelect;
};

export type FormPropsType = {
  onSubmit: (data: any) => void;
  formFields: formPropsFieldsType;
  submitButton: {
    text: string;
  };
};

const Form = ({ onSubmit, formFields, submitButton }: FormPropsType) => {
  const [formData, setFormData] = useState<{ [name: string]: string }>({})
  const [formError, setFormError] = useState<{ [name: string]: boolean }>({})

  useEffect(() => {
    setFormData(Object.fromEntries(
      Object.entries(formFields).map(([name, { initialData }]) => [
        name,
        initialData.toString(),
      ])
    ));
    setFormError(Object.fromEntries(
      Object.entries(formFields).map(([name, _]) => [
        name,
        false,
      ])
    ))
  }, [formFields])

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFormError({
      ...formError,
      [name]:
        formFields[name].regex !== null &&
        !value.toString().match(new RegExp(formFields[name].regex!))
    })
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(
      formData
    );
  };

  return (
    <>
      <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
        {Object.entries(formFields).map(([name, fields]) => {
          return (
            <div className="form-group" key={name}>
              <label htmlFor="username" className="input-label">
                {fields.label}
              </label>
              {fields.type === "select" ? (
                <select
                  name={name}
                  id={name}
                  value={formData[name]}
                  placeholder={fields.placeholder}
                  onChange={handleChange}
                  disabled={fields.disabled}
                  className="input"
                >
                  <option value={""} disabled hidden>
                    Select {name}
                  </option>
                  {fields.options.map(({ value, label }) => (
                    <option value={value} key={value}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={fields.type}
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={fields.placeholder}
                  className="input"
                  disabled={fields.disabled}
                />
              )}
              {formError[name] && (
                <span className="text-sm text-red-600">
                  {fields.errorMessage}
                </span>
              )}
            </div>
          );
        })}
        <button className={"bg-violet-700 long-button"} type="submit">
          {submitButton.text}
        </button>
      </form>
    </>
  );
};

export default Form;
