import { useState } from 'react';

export const useForm = (initialValues: any, validate: (values: any) => any) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setErrors(validate(values));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  return { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting };
};
