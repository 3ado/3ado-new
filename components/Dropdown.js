import React from 'react';

const Dropdown = ({ label, options, selected, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <select
        value={selected}
        onChange={onChange}
        className="w-full p-2 border rounded text-black"
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
