import { createContext, useEffect, useState } from "react";
import { lookInSession } from "../utils/session";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    const userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
