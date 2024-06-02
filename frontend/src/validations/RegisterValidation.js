export const validate = (values) => {
    const errors = {
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    };
  
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/i.test(values.name)) {
      errors.name = 'Should not contain numbers!';
    }
  
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!values.password.trim()) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Contain at least 6 characters';
    }
  
    if (!values.confirm_password.trim()) {
      errors.confirm_password = 'Confirm Password is required';
    } else if (values.confirm_password !== values.password) {
      errors.confirm_password = 'Password should match!';
    }
  
    return errors;
  };
  