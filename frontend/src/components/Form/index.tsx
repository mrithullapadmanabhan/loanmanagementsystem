import { useEffect, useState } from "react";

type FormType = {
  onSubmit: (data: unknown) => unknown;
  formFields: {
    fieldType: string;
    name: string;
    type?: null | string;
    label: string;
    placeholder: string;
    regex?: string;
    errorMessage?: string;
    options?: null | { label: string, value: string }[];
    initialData: string | number | readonly string[];
    max?: string;
    min?: string;
  }[];
  submitButton: {
    text: string;
    color: string;
  };
};

const Form = ({ onSubmit, formFields, submitButton }: FormType) => {

  useEffect(() => {

  }, formFields)

  const [formData, setFormData] = useState(
    Object.fromEntries(
      formFields.map((field) => [field.name, field.initialData])
    )
  );

  useEffect(() => {
    setFormData(Object.fromEntries(
      formFields.map((field) => [field.name, field.initialData])
    ))
  }, formFields)

  console.log(formFields)
  console.log(formData)
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
            {field.fieldType == 'input' && <input
              type={field.type!}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="input"
              max={field.max}
              min={field.min}
            />}
            {field.fieldType == "dropdown" && (
              <select name={field.name} id={field.name} value={formData[field.name]} onChange={handleChange} className='input'>
                <option value={""} disabled hidden>Select {field.name}</option>
                {field.options?.map((option) => (<option value={option.value} key={option.value}>{option.label}</option>))}
              </select>
            )}
            {formError[field.name] !== "" && (
              <span className="text-sm text-red-600">
                {formError[field.name]}
              </span>
            )}
          </div>
        ))}
        <button
          className={`bg-[#4338CA] long-button`}
          type="submit"
        >
          {submitButton.text}
        </button>
      </form>
    </>
  );
};

export default Form;
