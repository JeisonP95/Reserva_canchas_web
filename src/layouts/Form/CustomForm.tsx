import React, { ReactNode } from 'react';
import './CustomForm.css';

interface CustomFormProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({
  children,
  onSubmit = (e) => {
    e.preventDefault();
  },
}) => {
  return (
    <form className="custom-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default CustomForm;