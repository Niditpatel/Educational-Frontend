import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Navbar from "../common/Navbar";
export default function LandingPage() {
  return (
    <div className="border flex flex-col h-screen overflow-auto">
      <Navbar />
      <Header />
      <div className="my-5">
        <Outlet />
      </div>
      <div className="border self-bottom mt-auto  py-4  bg-primary ">
        <Footer />
      </div>
    </div>
  );
}
