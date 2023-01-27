import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { VerifyAccount as VerifyAccountService } from "../../AuthService";

import verifyemail from "../../Images/verifyemail.jpg";

export default function VerifyAccount() {
  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState("");

  const params = useParams();

  useEffect(() => {
    VerifyAccountService(params.token).then((res) => {
      setAPIerror("");
      setAPIsuccess("");
      if (res.success === 0) {
        setAPIerror(res.message);
      } else if (res.success === 1) {
        setAPIsuccess(res.message);
      }
    });
  }, []);

  return (
    <>
      <div className="container border w-full mt-4 h-full md:min-h-[400px] lg:min-h-[550px] text-primary bg-light2">
        <div className="w-fit mx-auto flex flex-col items-center">
          <div>
            <img
              src={verifyemail}
              alt=""
              className="h-48 w-48 lg:h-96 lg:w-96"
            />
          </div>
          {APIerror.length > 0 && (
            <div className="text-xl text-secondary  bg-warning rounded py-2 my-2 px-2">
              {APIerror}
            </div>
          )}
          {APIsuccess.length > 0 && (
            <div className="text-xl text-secondary flex bg-success rounded p-2 my-2">
              {APIsuccess}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
