import { createContext, useState, useContext, useEffect } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const updateLoginErrorMessage = (newLoginErrorMessage) => {
    setLoginErrorMessage(newLoginErrorMessage);
  };
  const updateShowLoginPopup = (newShowLoginPopup) => {
    setShowLoginPopup(newShowLoginPopup);
  };
  const updateSignupErrorMessage = (newSignupErrorMessage) => {
    setSignupErrorMessage(newSignupErrorMessage);
  };
  const updateShowSignupPopup = (newShowSignupPopup) => {
    setShowSignupPopup(newShowSignupPopup);
  };
  
  return (
    <PopupContext.Provider
      value={{
        loginErrorMessage,
        updateLoginErrorMessage,
        showLoginPopup,
        updateShowLoginPopup,
        signupErrorMessage,
        updateSignupErrorMessage,
        showSignupPopup,
        updateShowSignupPopup
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContext;

export const usePopupContext = () => {
  return useContext(PopupContext);
};
