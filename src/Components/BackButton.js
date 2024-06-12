import React from 'react';
import "./BackButton.css"
const BackButton = ({ onClick }) => {
  const goBack = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className="back-button" onClick={goBack}>
      <span>&#8592;</span> Back
    </button>
  );
};

export default BackButton;
