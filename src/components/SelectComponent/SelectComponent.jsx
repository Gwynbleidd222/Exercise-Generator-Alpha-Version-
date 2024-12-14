import React from "react";
import '../SelectComponent/selectComponent.css'

function SelectComponent({ label, options, value, onChange }) {
    return (
        <div className="questionnaire">
            <label>{label}:</label>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectComponent