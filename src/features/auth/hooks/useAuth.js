// src/auth/hooks/useAuth.js

import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, fetchUser,registerUser,refreshAuthToken,getMe } from "../authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, roles, loading, error } = useSelector((state) => state.auth);

  const getCurrentUser = () => dispatch(getMe());

  const login = ({ email, password }) => dispatch(loginUser({ email, password }));
  const logout = () => dispatch(logoutUser());
  const refreshUser = () => dispatch(fetchUser());
  const register = (data) => dispatch(registerUser(data));
  const refreshToken = () => dispatch(refreshAuthToken());



  const getRoles = () => {
    // If user is logged in and has a role_type property, use it
    var user = getCurrentUser();
    console.log('getCurrentUser:', user);
   
    if (user && user.role_type) {
      // Check if role_type is already an array, otherwise create an array from it
      if (Array.isArray(user.role_type)) {
        return user.role_type;
      } else {
        return [user.role_type];
      }
    } else {
      console.log('No user found, returning empty roles array');
      return ['0'];
   
    }

  };

  const hasRole = (roleName) => roles.includes(roleName);

  
  const hasAnyRole = (allowedRoles) => allowedRoles.some((r) => roles.includes(r));


  return {
    user,
    roles,
    loading,
    error,
    login,
    logout,
    refreshUser,
    register,
    refreshToken,
    hasRole,
    hasAnyRole,
    getRoles,
  };
};
