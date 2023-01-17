import { FaUserClock, FaSchool } from "react-icons/fa";
import { BsFillDisplayFill } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogUserDetail } from "../Login/LogUserContext";
export default function Administration() {
  const [LogUser, setLogUser] = useState<LogUserDetail>();
  useEffect((): any => {
    const User: any = sessionStorage.getItem("User");
    if (User) setLogUser({ ...JSON.parse(User) });
    return console.log("false");
  }, []);
  return (
    <>
      {LogUser && (
        <div className="px-2">
          <div className="container text-primary">
            <div className="text-primary capitalize">administration</div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {(LogUser.role === "SuperAdmin" ||
                LogUser.role === "SchoolAdmin") && (
                <div className="">
                  <div className="text-6xl w-fit h-fit mx-auto text-light2   lg:text-7xl xl:text-9xl  ">
                    <FaUserClock />
                  </div>
                  <div className="w-fit h-fit mx-auto capitalize">
                    <Link to={"/users"}>users</Link>
                  </div>
                </div>
              )}
              {LogUser.role === "SuperAdmin" && (
                <div className="">
                  <div className="text-6xl w-fit h-fit mx-auto text-light2   lg:text-7xl xl:text-9xl  ">
                    <FaSchool />
                  </div>
                  <div className="w-fit h-fit mx-auto capitalize">
                    <Link to={"/institutes"}>institutes</Link>
                  </div>
                </div>
              )}
              {(LogUser.role === "SuperAdmin" ||
                LogUser.role === "SchoolAdmin" ||
                LogUser.role === "Teacher") && (
                <div className="">
                  <div className="text-6xl w-fit h-fit mx-auto text-light2   lg:text-7xl xl:text-9xl  ">
                    <BsFillDisplayFill />
                  </div>
                  <div className="w-fit h-fit mx-auto capitalize">
                    <Link to={"/classes"}>classes</Link>
                  </div>
                </div>
              )}
              {(LogUser.role === "SuperAdmin" ||
                LogUser.role === "SchoolAdmin" ||
                LogUser.role === "Teacher") && (
                <div className="">
                  <div className="text-6xl w-fit h-fit mx-auto text-light2 lg:text-7xl xl:text-9xl  ">
                    <ImBooks />
                  </div>
                  <div className="w-fit h-fit mx-auto capitalize">
                    <Link to={"/assets"}>assets</Link>
                  </div>
                </div>
              )}
              <div>others are on the way</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
