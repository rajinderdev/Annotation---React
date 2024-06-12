import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {


const token=localStorage.getItem('token')

  if (token){
    return children;
  }
  else if (!isLoggedIn) {
    
    return <Navigate to="/" replace state={{islogin:true,path:window?.location.pathname}} />;
  }
  return children;
};
export default Protected;