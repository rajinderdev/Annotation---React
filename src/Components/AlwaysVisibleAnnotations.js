import React from 'react';

const AlwaysVisibleAnnotations = ({ annotations }) => {
  return (
    <div className="always-visible-annotations">
      {annotations.map((annotation) => (
        <div
          key={annotation.data.id}
          className="always-visible-annotation"
          style={{
            left: `${annotation.geometry.x}%`,
            top: `${annotation.geometry.y + annotation.geometry.height}%`,
            width: `${annotation.geometry.width}%`,
            height: 'auto', // Adjust as needed
            position: 'absolute',
          }}
        >
          {annotation.data.text}
        </div>
      ))}
    </div>
  );
};

export default AlwaysVisibleAnnotations;
