import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus } from "../services/auth/auth";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [isauth, setisauth] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    new Promise(async (resolve, reject) => {
      const data = await checkAuthStatus();
      console.log(data);
      if (data.success) {
        setisauth(true);
        resolve();
      } else {
        reject("error");
      }
    });
    checkAuthStatus();
  }, []);
  return (
    <AuthContext.Provider value={{ isauth, setisauth, id, setId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
