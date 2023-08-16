import { useState } from "react";

type FormType = {
  onSubmit: (data: unknown) => unknown;
  formFields: {
    name: string;
    type: string;
    label: string;
    placeholder: string;
    regex?: string;
    errorMessage?: string;
    initialData: string | number | readonly string[];
  }[];
  submitButton: {
    text: string;
    color: string;
  };
};

const Form = ({ onSubmit, formFields, submitButton }: FormType) => {
  const [formData, setFormData] = useState(
    Object.fromEntries(
      formFields.map((field) => [field.name, field.initialData])
    )
  );
  const [formError, setFormError] = useState(
    Object.fromEntries(formFields.map((field) => [field.name, ""]))
  );
  const fieldValidationDetails = Object.fromEntries(
    formFields.map((field) => [
      field.name,
      { regex: field.regex, message: field.errorMessage },
    ])
  );

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    validateField(event.target.name, event.target.value);
  };

  const validateField = (name: string, value: string) => {
    if (fieldValidationDetails[name] && fieldValidationDetails[name].regex) {
      const regExp = new RegExp(fieldValidationDetails[name].regex!);
      if (value !== undefined && !regExp.test(value)) {
        setFormError({
          ...formError,
          [name]: fieldValidationDetails[name].message!,
        });
        return;
      }
    }

    setFormError({
      ...formError,
      [name]: "",
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor="username" className="input-label">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="input"
            />
            {formError[field.name] !== "" && (
              <span className="text-sm text-red-600">
                {formError[field.name]}
              </span>
            )}
          </div>
        ))}
        <button
          className={`bg-[${submitButton.color}] long-button`}
          type="submit"
        >
          {submitButton.text}
        </button>
      </form>
    </>
  );
};

export default Form;
