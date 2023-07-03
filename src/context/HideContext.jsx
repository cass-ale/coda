import { createContext, useState } from "react";

export const HideContext = createContext();

export const HideContextProvider = ({ children }) => {
    const [showChat, setShowChat] = useState(false);
    const [showSide, setShowSide] = useState(true);



  return (
    <HideContext.Provider value={{ showChat, setShowChat, showSide, setShowSide }}>
      {children}
    </HideContext.Provider>
  );
};