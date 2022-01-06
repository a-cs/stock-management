/* eslint-disable react/prop-types */
import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

import './styles.css';

interface ModalProps {
  inputName: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleSwitch: React.FC<ModalProps> = ({ inputName, value, setValue }) => {
  const onToggle = () => setValue(!value);
  return (
    <div className="inputContainer">
      <h4 className="inputName">{inputName}</h4>
      <div className="inputWrapper">
        <button type="button" onClick={() => setValue(false)}>
          <FiX size="24px" strokeWidth="5" color="var(--color-red)" />
        </button>
        <label htmlFor={inputName} className="toggle-switch">
          <input
            id={inputName}
            type="checkbox"
            placeholder=" "
            checked={value}
            onChange={onToggle}
          />
          <span className="switch" />
        </label>
        <button type="button" onClick={() => setValue(true)}>
          <FiCheck
            size="24px"
            strokeWidth="5"
            color="var(--color-light-green)"
          />
        </button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
