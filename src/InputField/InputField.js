
import React from "react";

export default function InputField({ type, name, placeholder, value, onChange }) {
  return (
    <div className="field">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
