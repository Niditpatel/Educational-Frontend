import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "tw-elements";

import { contextLogUser } from "../Login/LogUserContext";

import point from "../../Images/point.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import Modal from "./Modal/Modal";
// import { Logotext } from "./LogoText/Logotext";

export default function Navbar() {
  const [LoggedUser, setLoggedUser] = useState<any>();

  const logUser = useContext(contextLogUser);

  const navigate = useNavigate();

  useEffect(() => {
    const user: any = sessionStorage.getItem("User");
    const logUser = user !== null ? JSON.parse(user) : user;
    setLoggedUser(logUser);
  }, [logUser]);

  // for logout
  function handleLogout() {
    sessionStorage.clear();
    setLoggedUser(null);
    navigate("/");
  }

  return (
    <>
      <div className="border-b  bg-primary">
        <nav className="relative w-full flex flex-wrap  items-center justify-between  text-white navbar navbar-expand-2xl  ">
          <div className="container w-full  flex flex-wrap items-center justify-between pr-6 ">
            <Link to={"/"}>
              <div className="flex">
                <img src={point} style={{ height: "50px" }} alt="logo-part" />
                <span className="flex uppercase items-center text-xl  ">
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
                  {LoggedUser === null && (
                    <div className="capitalize text-light2 flex space-x-2 items-center  py-2 skew-x-[20deg]  xl:px-5 xl:text-primary xl:bg-light2">
                      <div className="-skew-x-[20deg]">
                        <Link to="/login" className="hover:text-light1">
                          login
                        </Link>
                      </div>
                      <span className="-skew-x-[20deg]">or</span>
                      <div className="-skew-x-[20deg]">
                        <Link to="/signup" className="hover:text-light1">
                          register{" "}
                        </Link>
                      </div>
                    </div>
                  )}
                  {LoggedUser && (
                    <div className="capitalize text-light2 h-full w-full   skew-x-[20deg]  xl:px-5 xl:text-primary xl:bg-light2">
                      <div className="-skew-x-[20deg] flex   space-x-2">
                        <div>
                          <div className="dropdown relative">
                            <button
                              className="dropdown-toggle  py-2.5 flex items-center whitespace-nowrap"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {LoggedUser.firstName} {LoggedUser.lastName}{" "}
                              &#9662;
                            </button>
                            <ul className=" dropdown-menu border w-full min-w-max absolute hidden z-50 float-left py-2 text-left rounded text-light2 bg-primary xl:text-primary xl:bg-light2  mt-1 m-0">
                              <li>
                                <button
                                  className=" dropdown-item px-4 flex w-full items-center space-x-2 focus:outline-none active:bg-blck"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  <AiOutlineUser />
                                  <span>Profile</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  className=" dropdown-item px-4 flex w-full items-center space-x-2 foucs:outline-none"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/admin");
                                  }}
                                >
                                  <RxDashboard />
                                  <span> Dashboard</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  className=" dropdown-item px-4 flex w-full items-center space-x-2 foucs:outline-none"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    document
                                      .getElementById("logoutModal")
                                      ?.click();
                                  }}
                                >
                                  <IoExitOutline />
                                  <span> log out</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Modal
        id="logoutModal"
        handleConform={handleLogout}
        modalText={"Are you sure , You want to Logout ?"}
        isFor={"warning"}
      />
    </>
  );
}
