import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTable } from "react-table";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../ToggleButton";
import { ToastContainer, toast } from "react-toastify";
import "./User.css";
import { DNA } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

const UserTable = ({ userData = [], toggleActive, updateUserData,onUpdateStatus }) => {
  console.log(userData);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Active",
        accessor: "status",
        Cell: ({ row }) => (
          <ToggleButton
            isActive={row.original.status}
            id={row.original.id}
            onToggleChange={handleToggleChange}
          />
        ),
      },
    ],
    [toggleActive]
  );
  const data = useMemo(() => userData, [userData]);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_KEY;
  const [obj, setObj] = useState({});
  useEffect(() => {
    // Good!
  }, [obj]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("/images/download.png");
  const [toasterMessage, setToasterMessage] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [showModal, setShowModal] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const [isLodaing, setIsLoading] = useState();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e, isActive) => {
    if (error) {
      setError(null);
    }
    const object = {};
    if (e.target.name == "status") object[e.target.name] = isActive;
    else object[e.target.name] = e.target.value;
    setObj({ ...obj, ...object });
  };
  const handleToggleChange = async (e, isActive, id) => {
    const statusAsNumber = isActive ? 1 : 0;
    const obj = {
      id: id,
      status: statusAsNumber,
    };
    try {
      setIsLoading(true);
      var form_data = new FormData();
      for (var key in obj) {
        form_data.append(key, obj[key]);
      }
      const res = await axios.post(`${url}/change-status`, form_data, config);
      toast.success("Status Change Successfully", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
      onUpdateStatus(id, statusAsNumber);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
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
        setIsLoading(false);
        const response = await axios.post(`${url}/register`, form_data);
        toast.success("User Added Successfully", {
          autoClose: 3000,
          position: toast.POSITION.TOP_RIGHT,
        });
        updateUserData(response.data.user);
        handleClose();
        setObj({});
        e.target.reset();
      } catch (error) {
        toast.error(error.response.data.error, {
          autoClose: 3000,
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error.response);
        setError(error.response.data.message);
      }
    }
  };
  const adduser = () => {
    setShowModal(true);
  };

  if (!userData || userData.length === 0) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="top-btn-aftr-title">
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
      <ToastContainer />
      <div className="addnote-child addone-value on-user-mng" onClick={adduser}>
        <img src="/images/Vector.png" />
        <p>New user</p>
      </div>
      {/* <button className='btn-save' >Add User</button> */}
      <div className="table-responsive-mn table-responsive-mn-user">
        <table {...getTableProps()}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows && rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        className="login-modal"
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{ border: "none", background: "transparent" }}
            onClick={handleClose}
          >
            <img className="img-fluid user-create-close" src="/images/cross.png" />
          </button>
        </div>
        {showModal && (
          <div className="signup-wrapper">
            <form onSubmit={signup}>
              {error && <div style={{ color: "red" }}>{error}</div>}
              <h2>Create a new user</h2>
              <hr></hr>
              <div className="user-inner-wrapper">
                <div className="new-user">
                  <div className="mb-3 user-input-box">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="inp"
                      placeholder="Email Address"
                      name="email"
                      value={obj.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 user-input-box">
                    <label>User Type</label>
                    <select
                      value={obj.user_type}
                      onChange={handleChange}
                      name="user_type"
                      className="inp"
                    >
                      <option value="">Please select a user type</option>
                      <option value="1">Administrator</option>
                      <option value="2">User</option>
                    </select>
                  </div>
                  <div className="mb-3 user-input-box">
                    <label>Password</label>

                    <input
                      type={passwordType}
                      className="inp"
                      name="password"
                      placeholder="Password"
                      value={obj.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 user-input-box activation">
                    <label>Activation</label>
                    <ToggleButton
                      isActive={false}
                      onToggleChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="button-wrapper">
                <Button
                  type="submit"
                  className="create-user-btn"
                  variant="primary"
                  size="lg"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserTable;
