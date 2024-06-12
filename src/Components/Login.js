import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { DNA } from "react-loader-spinner";

import axios from "axios";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaMobile,
  FaPhone,
  FaUser,
} from "react-icons/fa";
const Login = ({ expanded,setExpanded,login, setLogin, isLoggedIn, setisLoggedIn }) => {
  const navigate = useNavigate();
  const [isLodaing, setIsLoading] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);
  const [obj, setObj] = useState({});
  const [image, setImage] = useState("/images/download.png");
  useEffect(() => {
    // Good!
  }, [obj]);
  const url = process.env.REACT_APP_API_KEY;

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleChange = (e) => {
    if (error) {
      setError(null);
    }
    const object = {};
    object[e.target.name] = e.target.value;
    setObj({ ...obj, ...object });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const submit = async (e) => {
    e.preventDefault();

    if (obj.password.length < 8) {
      setError("Password must be at least 8 chars long");
    }
    if (!error) {
      try {
        setIsLoading(true);
        const response = await axios.post(`${url}/login`, obj);
        const token = JSON.stringify(response.data.token);
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user_details",
          JSON.stringify(response.data.user_details)
        );
        if (response.data.promocode) {
          localStorage.setItem(
            "promocode",
            JSON.stringify(response.data.promocode)
          );
        }

        if (token) {
        
          toast.success("Login successfully", {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
          });
         
          setTimeout(() => {
            setIsLoading(false);
            setisLoggedIn(true);
            navigate("/folders");
          }, 800);
         
        }
        setObj({});
        e.target.reset();
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.error, {
          autoClose: 3000,
          position: toast.POSITION.TOP_RIGHT,
        });
        setError(error.response.data.message);
      }
    }
  };

  const toggle = () => {
    setObj({});
    if (login == "login") setLogin("signup");
    else setLogin("login");
  };
  const signup = async (e) => {
    e.preventDefault();
    if (!validateEmail(obj.email)) {
      setError("Invalid Email");
      return;
    }

    if (obj.password.length < 8) {
      setError("Password must be at least 8 chars long");
      return;
    }
    if (!error) {
      var form_data = new FormData();
      var item = { ...obj };
      for (var key in item) {
        form_data.append(key, item[key]);
      }
      try {
        const response = await axios.post(`${url}/register`, form_data);
         
        const token = JSON.stringify(response.data.token);
        localStorage.setItem("token", token);
        
        if (token) {
          navigate("/home");
          setisLoggedIn(true);
        }
        setObj({});
        e.target.reset();
      } catch (error) {
        console.log(error.response);
        setError(error.response.data.message);
      }
    }
  };
  const onChangePhoto = async (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    const reader = new FileReader();

    reader.onloadend = () => {
      const binaryString = reader.result;
      const imageFile = new File([binaryString], file.name, {
        type: file.type,
      });
      setObj({ ...obj, image: imageFile });
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
     
         {isLodaing&&
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
          }
     
           
      {login == "login" && (
        <div className="login-wrapper">
         
          <ToastContainer />
          <form onSubmit={submit}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div className="login-inner">
              <div className="login-input-wrapper">
                <div className="card-header">Log in</div>
                 {expanded && <div className="logout-message">
                    <p>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
                   You have been successfully logged out
                   </p>

<span style={{cursor:"pointer"}} onClick={()=>{ setExpanded(false)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></span>
                  </div>}
                <div className="login-input-box">
                  <div className="mb-3 input-box">
                    <label>Username</label>
                    <input
                      type="email"
                      className="login-inp"
                      placeholder="Enter username"
                      name="username"
                      value={obj.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 input-box">
                    <label>Password</label>
                    <input
                      type="password"
                      className="login-inp"
                      name="password"
                      placeholder="Enter password"
                      value={obj.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  {/* <div className="password-section">
      <div className='remember-block'>
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
      </div>
            <div className='forget'>
            <span className="text-right">
             Forgot <a href="#">password?</a>
          </span>
            </div>
            
            </div> */}

                  <div className="submit-btn-login">
                    <Button type="submit" className="login-btn">
                      Log in
                    </Button>
                  </div>
                </div>

                {/* <p className="text-center sign-up-text">
      New member? <Link to="#" onClick={toggle}>Sign up</Link>
      </p>    */}
              </div>
            </div>
          </form>
        </div>
      )}
      {login == "signup" && (
        <div className="signup-wrapper">
          <form onSubmit={signup}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <h2>Sign up</h2>
            <p>Create your account here</p>
            <div className="signup-inner-wrapper">
              <div className="input-feilds-wrapper">
                <div className="mb-3 input-box">
                  <FaUser />
                  <input
                    type="name"
                    className="inp"
                    placeholder="Enter full name"
                    name="name"
                    value={obj.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 input-box">
                  <FaUser />
                  <input
                    type="name"
                    className="inp"
                    placeholder="Enter User Name"
                    name="username"
                    value={obj.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 signup-password input-box">
                  <FaLock />{" "}
                  <input
                    type={passwordType}
                    className="inp"
                    name="password"
                    placeholder="Password"
                    value={obj.password}
                    onChange={handleChange}
                  />
                  <div onClick={togglePassword}>
                    {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <div className="mb-3 input-box">
                  <FaLock />
                  <input
                    type="password"Sidebar
                    className="inp"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    value={obj.password_confirmation}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="image-wrapper">
                <div className="upload-image">
                  <div className="profile-pic-container">
                    <img className="profile-pic" src={image} alt="" />
                  </div>

                  <div className="profile-pic-update-container">
                    <div className="">
                      <label
                        for="profilePhoto"
                        htmlFor="profilePhoto"
                        className="form-label"
                      >
                        Upload Picture <img src="\images\upload-icon.svg" />
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        multiple={false}
                        id="profilePhoto"
                        onChange={onChangePhoto}
                      />
                    </div>
                    <input
                      type="button"
                      value="Upload"
                      className="btn btn-primary btn-block mt-1"
                      onClick={onChangePhoto}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="button-wrapper">
              <Button
                type="submit"
                className="login-btn"
                variant="primary"
                size="lg"
              >
                Signup
              </Button>
              <p className="text-right login-link">
                Already have an account?{" "}
                <Link to="#" onClick={toggle}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
