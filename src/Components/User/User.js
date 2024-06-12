import React, { useLayoutEffect, useState } from 'react';
import UserTable from './UserTable';
import axios from 'axios';
import MiniHeader from '../MiniHeader';
import { DNA } from "react-loader-spinner";
const User = () => {

  const [users, setUsers] = useState([]);
  const [isLodaing, setIsLoading] = useState();
  const url = process.env.REACT_APP_API_KEY
  const token = JSON.parse(localStorage.getItem('token'));
  let config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  useLayoutEffect(() => {
    (async () => {
      try {
        getUser();
      } catch (error) {
      }

    })();

  }, []);

   const getUser = async ()=>{
    try {
      setIsLoading(true)
        const response = await axios.get(`${url}/get-user`,config)
        setUsers(
          response.data
        )
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      };
      }
      const updateUserData = (newUser) => {
        setUsers((prevUserData) => [...prevUserData, newUser]);
      };
      const handleUpdateStatus = (id, newStatus) => {
        // Create a new array with the updated object
        const updatedData = users.map(user =>
          user.id === id ? { ...user, status: newStatus } : user
        );
    
        // Update the state in the parent component
        setUsers(updatedData);
      };


  const toggleActive = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div>
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
     <MiniHeader head='Manage User' />
      <UserTable userData={users} toggleActive={toggleActive} updateUserData={updateUserData } onUpdateStatus={handleUpdateStatus}/>
    </div>
  );
};

export default User;
