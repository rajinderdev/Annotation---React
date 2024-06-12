import React, { useState } from 'react';

const ToggleButton = ({ isActive,id, onToggleChange }) => {
  const [active, setActive] = useState(isActive);

  const handleChange = (e) => {
    setActive(!active);
    onToggleChange(e,!active,id); 

  };

  return (
    <label className="toggleSwitch">
      <input
        type="checkbox"
        checked={active}
        value={active}
        onChange={handleChange}
        className="toggleSwitch-checkbox"
        name='status'
      />
      <span className="toggleSwitch-slider"></span>
    </label>
  );
};

export default ToggleButton;
