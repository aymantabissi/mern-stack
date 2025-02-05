import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export const PrivateRoute = ({ element, roles, ...rest }) => {
  const token = localStorage.getItem('token');
  
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decode token to get user role
  const decodedToken = jwt_decode(token);
  
  // If the user doesn't have the required role, redirect
  if (!roles.includes(decodedToken.role)) {
    return <Navigate to="/" />;
  }

  // If everything is fine, render the element
  return element; // Render the passed component directly
};
