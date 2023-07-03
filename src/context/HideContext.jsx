import { createContext, useState } from "react";

export const HideContext = createContext();

export const HideContextProvider = ({ children }) => {
    const [showChat, setShowChat] = useState(false)




  return (
    <HideContext.Provider value={{ showChat, setShowChat }}>
      {children}
    </HideContext.Provider>
  );
};