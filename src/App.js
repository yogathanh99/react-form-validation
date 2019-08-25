import React from 'react';

import Form from './components/Form/Form';
import './App.css';

const emailRegex = RegExp(
  /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm,
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(formErr => {
    formErr.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends React.Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    formErrors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  };

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'firstName':
        formErrors.firstName =
          value.length < 3 ? 'minimum 3 characaters required' : '';
        break;
      case 'lastName':
        formErrors.lastName =
          value.length < 3 ? 'minimum 3 characaters required' : '';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ''
          : 'Invalid email address';
        break;
      case 'password':
        formErrors.password =
          value.length < 6 ? 'minimum 6 characaters required' : '';
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  render() {
    const {
      handleChange,
      handleSubmit,
      state: { formErrors },
    } = this;

    return (
      <div className='App'>
        <div className='form-wrapper'>
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit} noValidate>
            {/* First Name */}
            <Form
              inputClassName={formErrors.firstName.length > 0 ? 'error' : null}
              classname='firstName'
              html='firstName'
              labelName='First Name'
              type='text'
              placeHolder='First Name'
              name='firstName'
              handleChange={handleChange}
              formError={formErrors.firstName}
            />
            {/* Last Name */}
            <Form
              inputClassName={formErrors.lastName.length > 0 ? 'error' : null}
              classname='lastName'
              html='lastName'
              labelName='Last Name'
              type='text'
              placeHolder='Last Name'
              name='lastName'
              handleChange={handleChange}
              formError={formErrors.lastName}
            />
            {/* Email */}
            <Form
              inputClassName={formErrors.email.length > 0 ? 'error' : null}
              classname='email'
              html='email'
              labelName='Email'
              type='email'
              placeHolder='Email'
              name='email'
              handleChange={handleChange}
              formError={formErrors.email}
            />
            {/* Password */}
            <Form
              inputClassName={formErrors.password.length > 0 ? 'error' : null}
              classname='password'
              html='passwor'
              labelName='Password'
              type='password'
              placeHolder='Password'
              name='password'
              handleChange={handleChange}
              formError={formErrors.password}
            />
            <div className='createAccount'>
              <button type='submit'>Create Account</button>
              <small>Already have an Account ?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
