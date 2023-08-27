import { useEffect, useState } from "react";

interface formFieldsType {
  label: string;
  regex?: string;
  errorMessage?: string;
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
  changeFunction?: (id: string) => void;
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
    const fields = formFields[name]
    setFormData({
      ...formData,
      [name]: value
    });
    setFormError({
      ...formError,
      [name]:
        fields.regex !== undefined &&
        !value.toString().match(new RegExp(fields.regex!))
    })

    if (fields.type === 'select') {
      fields.changeFunction && fields.changeFunction(value);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(
      formData
    );
  };

  return (
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
                required={true}
              >
                <option value={""} disabled hidden>
                  Select {fields.label}
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
              <span className="text-xs text-red-600">
                {fields.errorMessage}
              </span>
            )}
          </div>
        );
      })}
      <button className={"bg-blue-900 long-button"} type="submit">
        {submitButton.text}
      </button>
    </form>
  );
};

export default Form;
