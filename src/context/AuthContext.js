import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const handelLogout = () => {
    setUserId(null);
    localStorage.removeItem("userID");
  };
  useEffect(() => {
    const Id = localStorage.getItem("userID");
    if (Id) setUserId(Id);
  }, []);
  const value = { setUserId, userId, handelLogout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
