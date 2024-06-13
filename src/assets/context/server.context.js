import React, { createContext, useState, useContext, useEffect } from 'react';

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
  const [selectedServer, setSelectedServer] = useState(localStorage.getItem('selectedServer') || 'server1');

  useEffect(() => {
    localStorage.setItem('selectedServer', selectedServer);
  }, [selectedServer]);

  return (
    <ServerContext.Provider value={{ selectedServer, setSelectedServer }}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => useContext(ServerContext);
