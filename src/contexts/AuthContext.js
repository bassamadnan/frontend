import { createContext, useContext, useState, useMemo } from 'react';
import authService from '../services/authService';
import { axiosAuthInstance } from '../services/axiosConfig';
// import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(authService.isAuthenticated);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [fetchedUser, setFetchedUser] = useState(false)
  const [fetchedUsers, setFetchedUsers] = useState(false)

  const fetchUserDetails = () => {
    axiosAuthInstance.get('/user/profile').then((response) => {
      setUser(response.data)
      setFetchedUser(true)
    }) 
    .catch((error) => {
      console.error("Error fetching user data", error);
    })
  }

  const fetchUsers = () => {
    axiosAuthInstance.get('/user/getusers').then((response) => {
      setUsers(response.data)
      setFetchedUsers(true)
    })
    .catch((error) => {
      console.error("Error fetching users ", error)
    })
  }

  const login = async (email, password) => {
    await authService.login(email, password);
    if ( authService.isAuthenticated ) {
      if(!fetchedUser) fetchUserDetails()
      if(!fetchedUsers) fetchUsers()
      setLoggedIn(authService.isAuthenticated);
    }
  };

  const logout = () => {
    authService.logout();
    setLoggedIn(authService.isAuthenticated);
  };

  const authContextValue = useMemo(
    () => ({ isLoggedIn, user, setUser, users, setUsers, fetchedUser, fetchedUsers, login, logout, fetchUserDetails, fetchUsers }),
    [isLoggedIn, user, users, fetchedUser, fetchedUsers, login, logout]
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
