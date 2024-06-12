import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const InputField = () => {
  const [text, setText] = useState('Drag text here');
  
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'text',
    item: { text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        ref={drag} // Attach the drag handler to the input
        style={{ opacity: isDragging ? 0.5 : 1 }} // Change opacity when dragging
      />
    </div>
  );
};

export default InputField;
