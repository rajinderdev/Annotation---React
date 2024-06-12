import React,{useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ColorSchemesExample({isLoggedIn,setisLoggedIn}) {
const navigate=useNavigate()
const [expanded, setExpanded] = useState(false);
  
  return (

    <div className='top_nav'>
  
       
      <Navbar expanded={expanded} expand="lg"  >
     <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}/>
        <Navbar.Collapse id="basic-navbar-nav">
      
           
        
             
       {!isLoggedIn ?   <Nav className="me-auto">

       {/* <Link to="/" onClick={() => setExpanded(false)} className="nav-item nav-link px-3">Home</Link> */}
            
           
            </Nav>: <Nav className="me-auto"> 

            
              </Nav>}
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
   
      
    </div>
  );
}

export default ColorSchemesExample;