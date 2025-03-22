import React from 'react';
import './CustomInput.css';

interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  editable?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  editable = false,
}) => {
  return (
    <div className="custom-input-container">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="custom-input"
      />
      {editable && (
        <button className="edit-button">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#333">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CustomInput;