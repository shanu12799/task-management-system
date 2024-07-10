import { useEffect } from "react";
import "./App.css";
import Home from "./Page/Home";
import SignIn from "./Page/SignIn";
import { useAuth } from "./context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTaskContext } from "./context/TaskContext";

function App() {
  const { userId } = useAuth();

  return (
    <div className="App">
      <ToastContainer />
      {userId ? <Home /> : <SignIn />}
    </div>
  );
}

export default App;
