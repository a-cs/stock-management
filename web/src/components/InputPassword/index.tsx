/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';

import './styles.css';

interface InputProps {
  text: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputPassword: React.FC<InputProps> = ({
  text,
  label,
  value,
  setValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword(): void {
    setShowPassword(!showPassword);
  }

  return (
    <label htmlFor={label} className="inputPassword">
      <input
        id={label}
        type={showPassword ? 'text' : 'password'}
        placeholder=" "
        required
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <span>{text}</span>
      <button type="button" onClick={toggleShowPassword}>
        {showPassword ? (
          <BiShow size="22px" strokeWidth="0" />
        ) : (
          <BiHide size="22px" strokeWidth="0" />
        )}
      </button>
    </label>
  );
};

export default InputPassword;
