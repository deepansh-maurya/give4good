import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar></Navbar>
        <div>
          <Outlet />
        </div>
      </AuthContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
