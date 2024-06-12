import React, { useEffect, useState,useParams } from "react";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { Button, Modal,Carousel,Card } from "react-bootstrap";
import "./style.css";
import "./Home.css"
import Login from "./Login";
import { useLocation, useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn, setisLoggedIn ,expanded ,setExpanded}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState("");

  // const [isMobile, setIsMobile] = useState(false)
  // const [isSingleDevice,setIsSingleDevice]=useState(false)
 
//choose the screen size 
// const handleResize = () => {

//   if (window.innerWidth < 576){
//     setIsSingleDevice(true)
//   }
//   else{
//     setIsSingleDevice(false)
//   }
//   if (window.innerWidth < 767 && window.innerWidth >= 576) {
//       setIsMobile(true)
//   } else {
//       setIsMobile(false)
//   }
// }

// // create an event listener
// useEffect(() => {
//   window.addEventListener("resize", handleResize)
// })

  const { state } = useLocation();
  
  useEffect(() => {
    handleShow("login")
    const token = localStorage.getItem("token");
    if (isLoggedIn || token) {
      navigate("/folders");
    }
   
    else if(state?.path){
      handleShow("login")
    }
    
  }, []);
  const handleClose = () => {
    setShow(false);
    setLogin("");
  };
  const handleShow = (status) => {
    setShow(true);
    setLogin(status);
  };
  return (


    <div className="main-content">
    
     
   <Login           expanded={expanded}
                    setExpanded={setExpanded}
                    login={login}
                    setLogin={setLogin}
                    isLoggedIn={isLoggedIn}
                    setisLoggedIn={setisLoggedIn}
                  />

    </div>
  );
};

export default Home;
