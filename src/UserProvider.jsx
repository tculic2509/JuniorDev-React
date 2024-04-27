import React, { createContext, useState, useContext } from 'react';

const UserRoleContext = createContext();

export const useUserRole = () => {
  return useContext(UserRoleContext);
};

export const UserRoleProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Default to user role

  return (
    <UserRoleContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </UserRoleContext.Provider>
  );
};
