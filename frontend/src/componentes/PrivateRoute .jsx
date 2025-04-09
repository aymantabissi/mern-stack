import { Navigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export const PrivateRoute = ({ element, roles, ...rest }) => {
  const token = localStorage.getItem('token');
  
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decode token to get user role
  let decodedToken;
  try {
    decodedToken = jwt_decode(token);
  } catch (error) {
    return <Navigate to="/login" />;
  }

  // If the user doesn't have the required role, redirect to Home
  if (roles && !roles.includes(decodedToken.role)) {
    return <Navigate to="/" />;
  }

  // If everything is fine, render the element
  return element; // Render the passed component directly
};
