import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState([]);

  return (
    <UserContext.Provider value={{ userName, setUserName, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
