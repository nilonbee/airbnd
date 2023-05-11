import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then((data) => {
        console.log("running useEffeect", data?.data);
        setUser(data?.data);
        setReady(true)
      });
    }
  }, [user?.firstName]);
  console.log(user);
  return (
    <GlobalContext.Provider value={{ ready, user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default Context;
