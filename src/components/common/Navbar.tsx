import point from "../../Images/point.svg";
import { Link } from "react-router-dom";
import "tw-elements";
import { AiOutlineMenu } from "react-icons/ai";
export default function Navbar() {
  return (
    <div className="border-b  bg-primary">
      <nav className="relative w-full flex flex-wrap  items-center justify-between  text-white navbar navbar-expand-xl  ">
        <div className="container w-full  flex flex-wrap items-center justify-between px-6 ">
          <Link to={"/"}>
            <div className="flex">
              <img src={point} style={{ height: "50px" }} alt="logo-part" />
              <span className="flex uppercase items-center text-xl text-white ">
                on
                <span className="text-light1 font-semibold">e</span>
                ducation
              </span>
            </div>
          </Link>
          <button
            className="navbar-toggler text-2xl py-2 px-2.5  focus:outline-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <AiOutlineMenu />
          </button>
          <div
            className="collapse navbar-collapse flex-grow  text-lg h-full "
            id="navbarSupportedContent"
          >
            <div className="navbar-nav flex flex-col xl:space-x-4  capitalize   ml-auto">
              <div className="nav-item p-2 text-light2 border-b border-light2 xl:text-white xl:border-0 ">
                <Link to="#">Blog</Link>
              </div>
              <div className="nav-item p-2 text-light2 border-b border-light2 xl:text-white xl:border-0 ">
                <Link to="#">further education</Link>
              </div>
              <div className="nav-item p-2 text-light2 border-b border-light2 xl:text-white xl:border-0">
                <Link to="#">primary</Link>
              </div>
              <div className="nav-item p-2 text-light2 border-b border-light2 xl:text-white xl:border-0">
                <Link to="#">secondary</Link>
              </div>
              <div className="nav-item p-2 text-light2 border-b border-light2 xl:text-white xl:border-0">
                <Link to="#">cannways cymraeg</Link>
              </div>
              <div className="nav-item p-2 text-light2 border-b border-light2 xl:text-white xl:border-0">
                <Link to="#">about</Link>
              </div>
              <div className="nav-item p-2 text-light2 border-b border-light2 xl:text-white xl:border-0">
                <Link to="#">
                  <span className="uppercase">faq</span>s
                </Link>
              </div>
              <div className="nav-item p-2 text-light2 border-b border-light2 xl:text-white xl:border-0">
                <Link to="#">partners</Link>
              </div>
              <div className="nav-item  h-full">
                <div className="capitalize text-light2 flex space-x-2 items-center  py-2 skew-x-[20deg]  xl:px-5 xl:text-primary xl:bg-light2">
                  <div className="-skew-x-[20deg]">
                    <Link to="/login" className="hover:text-light1">
                      login
                    </Link>
                  </div>
                  <span className="-skew-x-[20deg]">or</span>
                  <div className="-skew-x-[20deg]">
                    <Link to="/signup" className="hover:text-light1">
                      ragister{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
