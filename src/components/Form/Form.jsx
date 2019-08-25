import React from 'react';

const Form = props => {
  const {
    classname,
    html,
    labelName,
    type,
    placeHolder,
    name,
    handleChange,
    inputClassName,
    formError,
  } = props;
  return (
    <div className={classname}>
      <label htmlFor={html}>{labelName}</label>
      <input
        className={inputClassName}
        type={type}
        placeholder={placeHolder}
        name={name}
        onChange={handleChange}
        noValidate
      />
      {formError.length > 0 && (
        <span className='errorMessage'>{formError}</span>
      )}
    </div>
  );
};

export default Form;
