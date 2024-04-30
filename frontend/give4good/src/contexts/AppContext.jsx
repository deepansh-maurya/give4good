import { createContext, useContext, useEffect, useState } from "react";
import { userProfile } from "../services/profile/userProfile";
import { checkAuthStatus } from "../services/auth/auth";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [isauth, setisauth] = useState(false);
  console.log("isauth", isauth);
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
    <AuthContext.Provider value={{ isauth, setisauth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
