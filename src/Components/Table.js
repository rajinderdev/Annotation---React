import React, { useEffect, useState } from "react";
import "./Table.css"
const Table = ({ annotations, attribute }) => {
  const [editedAnnotations, setEditedAnnotations] = useState([]);

  useEffect(() => {
    setEditedAnnotations(annotations.map(annotation => ({ ...annotation })));
  }, [annotations]);

  const handleFieldChange = (index, field, value) => {
    const updatedAnnotations = [...annotations];
    updatedAnnotations[index][field] = value;
    setEditedAnnotations(updatedAnnotations);
  };

  console.log(annotations);
  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Number</th>
            <th>Attribute</th>
            <th>Description</th>
            <th>En</th>
            <th>Fr</th>
            <th>Source</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {editedAnnotations.map((annotation, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <select
                  value={annotation.attribute}
                  onChange={(e) => handleFieldChange(index, 'attribute', e.target.value)}
                >
                  {attribute
                    .filter((item) => item.id !== annotation.attribute) // Exclude the current attribute
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </td>
              <td
                contentEditable
                onBlur={(e) => handleFieldChange(index, 'description', e.target.innerText)}
                dangerouslySetInnerHTML={{ __html: annotation.description }}
              />
              <td
                contentEditable
                onBlur={(e) => handleFieldChange(index, 'en', e.target.innerText)}
                dangerouslySetInnerHTML={{ __html: annotation.en }}
              />
              <td
                contentEditable
                onBlur={(e) => handleFieldChange(index, 'fr', e.target.innerText)}
                dangerouslySetInnerHTML={{ __html: annotation.fr }}
              />
              <td
                contentEditable
                onBlur={(e) => handleFieldChange(index, 'source', e.target.innerText)}
                dangerouslySetInnerHTML={{ __html: annotation.source }}
              />
              <td
                contentEditable
                onBlur={(e) => handleFieldChange(index, 'notes', e.target.innerText)}
                dangerouslySetInnerHTML={{ __html: annotation.notes }}
              />
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
}

export default Table;