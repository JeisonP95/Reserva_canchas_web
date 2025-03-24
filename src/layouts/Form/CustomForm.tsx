import React, { ReactNode } from 'react';
import './CustomForm.css';

interface CustomFormProps {
  children: ReactNode;
}

const CustomForm: React.FC<CustomFormProps> = ({
  children
}) => {
  return (
    <form className="custom-form">
      {children}
    </form>
  );
};

export default CustomForm;