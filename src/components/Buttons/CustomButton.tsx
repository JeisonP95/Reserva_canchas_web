import React from 'react';
import './CustomButton.css';

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-button ${variant}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;