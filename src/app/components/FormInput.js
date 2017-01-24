import React from 'react';
import Input from 'react-toolbox/lib/input';


const FormInput = ({
  type = 'text',
  label,
  value,
  name,
  theme,
  onFocus,
  onChange,
  onBlur
}) => {
  const {inputPrefix, inputSuffix} = theme;

  return (
    <div className={`${name}Wrapper`} data-ref={name}>
      <p className={inputPrefix}>
          {label}(
      </p>
      <Input
          {...{type, label, name, value, onFocus, onChange, onBlur}} />
      <p className={inputSuffix}>)</p>
    </div>
  );
};

export default FormInput;
