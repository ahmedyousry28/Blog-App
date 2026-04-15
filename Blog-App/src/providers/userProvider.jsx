import { createContext, useState } from "react";
import { useNavigate } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  let user = localStorage.getItem("user") || null;
  user = JSON.parse(user);
  const [userData, setUserData] = useState(user);
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUserData(data);
    navigate("/");
  };
  const logOut = () => {
    localStorage.removeItem("user");
    setUserData(null);
    navigate("/");
  };
  return (
    <UserContext.Provider value={{ userData, logOut, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
