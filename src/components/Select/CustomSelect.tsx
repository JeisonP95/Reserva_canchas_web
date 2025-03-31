import React from "react";
import "./CustomSelect.css";

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, placeholder }) => {
    return (
        <div className="custom-select-container">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="custom-select"
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelect;
