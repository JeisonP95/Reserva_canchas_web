import React from "react";
import "./FormData.css";

interface FormDataProps {
    childLeft: React.ReactNode;
    childRight: React.ReactNode;
}

const FormData: React.FC<FormDataProps> = ({ childLeft, childRight }) => {
    return (
        <div className="form-data">
            <div className="form-data-child-left">{childLeft}</div>
            <div className="form-data-child-right">{childRight}</div>
        </div>
    );
};

export default FormData;