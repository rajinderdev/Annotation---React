import React,{useState,useEffect} from 'react'

import "./App.css"
import { Route, Routes,useLocation } from 'react-router-dom'

import Home from './Components/Home';

import Projects from './Components/Projects';
import Sidebar from './Components/Sidebar';
import Footer from './Footer/Footer';
import Navbar from './Header/Navbar';
import Protected from './Components/Protected';

import User from './Components/User/User';
import Attribute from './Components/Attribute';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const App=()=> {
    
  
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate=useNavigate()
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  let HomePageStyling ='content-main container-fluid'
  if (location.pathname === '/'||location.pathname === '/termsandconditions') {
    HomePageStyling = '';
}
const onLogout=()=>{
  localStorage.clear()
setExpanded(true)
  setisLoggedIn(false)
navigate("/")
}


  useEffect(() => {
    setIsHovered(false)
    const token=localStorage.getItem('token')
    if(!token){
      setisLoggedIn(false)
    }
    else
    {
      setisLoggedIn(true)
    }

  }, [isLoggedIn]);
 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
 
    <div className="top-nav-tp">
       <img className='logo-on-top' src="/images/latunji-logo.png"/> 
       
       {isLoggedIn &&<>
       <div  className={`user-dropdown ${isHovered ? "hovered" : ""}`}
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}>
       <img
       src="/images/userLogin.png"
     
     />
      {isHovered &&
     
       <Button onClick={onLogout} className="nav-item nav-link px-3 logout-btn">Logout</Button>
      } 
       </div>
       </>}
    </div>
     { <Navbar isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>}
     <div className={HomePageStyling}>

      {isLoggedIn && location.pathname != '/termsandconditions' && isSidebarOpen && <Sidebar />}
      <Routes>
        <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} expanded={expanded} setExpanded={setExpanded}/>}  />
     
        <Route path="/folders" element={<Protected isLoggedIn={isLoggedIn}> <div className='main'>  <Projects isSidebarOpen={setIsSidebarOpen}/></div></Protected>}/>
        <Route path="/user" element={<Protected isLoggedIn={isLoggedIn}> <div className='main'>  <User/></div></Protected>}/>
        <Route path="/attribute" element={<Protected isLoggedIn={isLoggedIn}> <div className='main'>  <Attribute/></div></Protected>}/>
      </Routes>
      </div>
      {/* <div className='footer-app'><Footer /></div>       */}
    </>
  );
}
export default App