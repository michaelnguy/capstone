// SelectedComponentContext.js
import React, { createContext, useContext, useState } from 'react';

// Define the context
const SelectedComponentContext = createContext();

// Create a provider component
export const SelectedComponentProvider = ({ children }) => {
  const [selectedComponent, setSelectedComponent] = useState('overview');

  return (
    <SelectedComponentContext.Provider
      value={{ selectedComponent, setSelectedComponent }}
    >
      {children}
    </SelectedComponentContext.Provider>
  );
};

// Custom hook to use the SelectedComponentContext
export const useSelectedComponent = () => useContext(SelectedComponentContext);
