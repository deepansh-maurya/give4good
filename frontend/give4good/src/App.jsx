import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
    </div>
  );
}

export default App;
