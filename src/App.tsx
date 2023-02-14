import { Outlet, useNavigate } from "react-router";
import "./App.css";
import "react-tooltip/dist/react-tooltip.css";
// import { useEffect } from "react";

function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const User = sessionStorage.getItem("User");
  //   if (User) {
  //     navigate("/admin");
  //   }
  // }, []);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
