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
  onBlur,
  prefix,
  suffix
}) => {
  const {inputPrefix, inputSuffix} = theme;

  return (
    <div className={`${name}Wrapper`} data-ref={name}>
      <p className={inputPrefix}>
          {`${label}${prefix}`}
      </p>
      <Input
          {...{type, label, name, value, onFocus, onChange, onBlur, theme}} />
      <p className={inputSuffix}>{suffix}</p>
    </div>
  );
};

export default FormInput;
