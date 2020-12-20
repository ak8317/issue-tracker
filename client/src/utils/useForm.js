import { useState } from 'react';

const useForm = ({ validate, setAlert, register, login }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    const { name, email, password } = values;
    e.preventDefault();
    //setErrors(validate(values));
    setIsSubmitting(true);
    //console.log(values);
    //setAlert('Hello', 'danger');
    if (values.name) {
      register({ name, email, password });
    } else {
      login(email, password);
    }
    setValues({ name: '', email: '', password: '', password2: '' });
  };
  return { handleChange, values, handleSubmit, errors };
};
export default useForm;
