import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import "./Attribute.css"
import 'react-toastify/dist/ReactToastify.css';
import { DNA } from "react-loader-spinner";
import MiniHeader from "./MiniHeader";
const Attribute = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [newAttributeName, setNewAttributeName] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const token = JSON.parse(localStorage.getItem('token'));
  const [isLodaing, setIsLoading] = useState();
  let config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = `${process.env.REACT_APP_API_KEY}/attributes`;

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(apiUrl, config);
      const result = await response.json();
      setData(result);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedId(null);
    setEditedName("");
    setNewAttributeName("");
    setSelectedAttribute("");
  };

  const handleShowModal = (id, name,parent_id) => {
   
    setShowModal(true);
    setParentId(parent_id)
    setEditedId(id);
    setEditedName(name);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${apiUrl}/${editedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: editedName,parent_id:selectedAttribute }),
      });
      setIsLoading(false)
      if (response.ok) {
      
        toast.success('Updated successfully', { autoClose: 3000, position: toast.POSITION.TOP_RIGHT });

        fetchData();
        handleCloseModal();
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error updating data:", error);
    }
  };

  const handleAddAttribute = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify({ name: newAttributeName ,parent_id:selectedAttribute }),
      });
      setIsLoading(false)
      if (response.ok) {
    
        toast.success('Added successfully', { autoClose: 3000, position: toast.POSITION.TOP_RIGHT });

        fetchData();
        handleCloseModal();
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error adding data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
      });
      setIsLoading(false)
      if (response.ok) {
    
        toast.success('Deleted successfully', { autoClose: 3000, position: toast.POSITION.TOP_RIGHT });

        fetchData();
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
        {isLodaing && (
        <div className="spinner">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      <MiniHeader head='Attribute Mangement' />
      <ToastContainer />
      <div className='addnote-child addone-value on-user-mng' onClick={() => setShowModal(true)}>
            <img src='/images/Vector.png' />
            <p>Add Attribute</p>
          </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => (
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td className="attr-action-btn">
                <Button className="attribut_edit_btn"
                  variant="primary"
                  onClick={() => handleShowModal(item.id, item.name,item.parent_id)}
                >
                  <img src="./images/edit-icon.png"></img>
                  
                </Button>{" "}
                <Button  className="attribut_edit_btn"
                  variant="danger"
                  onClick={() => handleDelete(item.id)}
                >
                   <img src="./images/delete.png"></img>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editedId ? "Edit Attribute" : "Add Attribute"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAttributeName">
              <Form.Label>Name</Form.Label>
              
              <Form.Control
                type="text"
                value={editedId ? editedName : newAttributeName}
                onChange={(e) =>
                  editedId ? setEditedName(e.target.value) : setNewAttributeName(e.target.value)
                }
              />
            </Form.Group>
           
              <Form.Group controlId="formSelectedAttribute">
                <Form.Label>Select Attribute</Form.Label>
                <Form.Control
                  as="select"
                  value={editedId ? parentId : selectedAttribute} // Use parentId as the selected value
                  onChange={(e) => setSelectedAttribute(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {data
                    .filter((item) => item.id !== editedId) // Exclude the edited item
                    .map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                    ))}
                </Form.Control>
           
              </Form.Group>
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {editedId ? (
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddAttribute}>
              Add Attribute
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Attribute;
