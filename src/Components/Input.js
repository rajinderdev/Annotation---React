import React from "react";

export default ({ placeholder, type, value, handleInput, name }) => {
  return (
    <input
    id="upload-img"
      type={type}
      name={name}
      value={value}
      onChange={handleInput}
      placeholder={placeholder}
      
    />
  );
};