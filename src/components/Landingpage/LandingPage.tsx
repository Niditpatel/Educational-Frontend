import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Navbar from "../common/Navbar";
import { LogUserContextProvider } from "../Login/LogUserContext";
import { useState } from "react";
export default function LandingPage() {
  const [Loguser, setLoguser] = useState(null);
  return (
    <div className="border flex flex-col h-screen overflow-auto">
      <LogUserContextProvider value={Loguser}>
        <Navbar />
        <Header />
        <div className="my-5">
          <Outlet context={{ setLoguser }} />
        </div>
        <div className="border self-bottom mt-auto  py-4  bg-primary ">
          <Footer />
        </div>
      </LogUserContextProvider>
    </div>
  );
}
