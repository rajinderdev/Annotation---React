// SidebarFolder.js
import React, { useEffect, useState } from "react";
import "./SidebarFolder.css";
import { Link } from "react-router-dom";

const SidebarFolder = ({ folder, singleView, addDot = false }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="nav-inner-nav-screen-sht">
      <div className="folder-header" onClick={handleToggle}>
        {folder.views && (
          <span className={isOpen ? "arow-rotate" : ""}>
            {isOpen ? ">" : ">"}
          </span>
        )}
        <span>
          {addDot &&
            <span style={{ marginRight: '5px', display: 'inline-block', fontSize: '40px', margin: '0', position: 'relative', top: '-10px', right: '5px' }}>.</span>}
          {folder.name}
        </span>
      </div>
      {isOpen && folder.views && (
        <div className="folder-children">
          {folder.views.map((child) => {
            if (singleView && singleView.name == child.name) {
              return <SidebarFolder key={child.id} folder={child} singleView={child} addDot={true} />
            }
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarFolder;
