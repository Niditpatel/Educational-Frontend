import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { LogUserDetail } from "../Login/LogUserContext";

import { FaUserClock, FaSchool } from "react-icons/fa";
import { BsFillDisplayFill } from "react-icons/bs";
import { ImBooks } from "react-icons/im";

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
        <div className="container px-2 text-primary">
          <div className="text-primary capitalize">administration</div>
          <div className="mt-3 grid grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3 md:gap-28">
            {(LogUser.role === "SuperAdmin" ||
              LogUser.role === "SchoolAdmin") && (
              <div className="w-fit">
                <div className="text-6xl w-fit h-fit mx-auto text-light2   lg:text-7xl xl:text-9xl hover:text-secondary">
                  <Link to={"/users"}>
                    <FaUserClock />
                  </Link>
                </div>
                <div className="w-fit h-fit mx-auto capitalize">users</div>
              </div>
            )}
            {LogUser.role === "SuperAdmin" && (
              <div className="w-fit">
                <div className="text-6xl w-fit h-fit mx-auto text-light2   lg:text-7xl xl:text-9xl hover:text-secondary ">
                  <Link to={"/institutes"}>
                    <FaSchool />
                  </Link>
                </div>
                <div className="w-fit h-fit mx-auto capitalize">institutes</div>
              </div>
            )}
            {(LogUser.role === "SuperAdmin" ||
              LogUser.role === "SchoolAdmin" ||
              LogUser.role === "Teacher") && (
              <div className="w-fit">
                <div className="text-6xl w-fit h-fit mx-auto text-light2   lg:text-7xl xl:text-9xl  hover:text-secondary">
                  <Link to={"/classes"}>
                    <BsFillDisplayFill />
                  </Link>
                </div>
                <div className="w-fit h-fit mx-auto capitalize">classes</div>
              </div>
            )}
            {(LogUser.role === "SuperAdmin" ||
              LogUser.role === "SchoolAdmin" ||
              LogUser.role === "Teacher") && (
              <div className="w-fit">
                <div className="text-6xl w-fit h-fit mx-auto text-light2 lg:text-7xl xl:text-9xl  hover:text-secondary">
                  <Link to={"/assets"}>
                    <ImBooks />
                  </Link>
                </div>
                <div className="w-fit h-fit mx-auto capitalize">assets</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
