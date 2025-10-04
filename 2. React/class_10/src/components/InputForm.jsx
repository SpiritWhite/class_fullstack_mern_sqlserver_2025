import React from 'react';


const InputForm = (props) => {
  const {
    name,
    onChange,
    className,
    type,
    values,
    placeholder
  } = props;

  return (
    <div className={className}>
      <input
        type={type}
        name={name}
        id={name}
        value={values[name]}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};


export default InputForm;