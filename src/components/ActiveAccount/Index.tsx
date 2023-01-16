import { ActivateAccount as ActiveAccountService } from "../../AuthService";
import { useParams } from "react-router-dom";
import setpassword from "../../Images/setpassword.png";
import { useState, useEffect } from "react";
import RegenerateLink from "../RegenerateLink/Index";
export default function ActiveAccount() {
  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState("");
  const [linkExpired, setlinkExpired] = useState({ message: "", id: "" });
  const params = useParams();
  const handleRegenerateLinkResponse = (res: any) => {
    if (res.sucess === 1) setAPIsuccess(res.message);
    else if (res.success == 0) setAPIerror(res.message);
  };
  useEffect(() => {
    ActiveAccountService(params.token).then((res) => {
      if (res.success === 0) {
        setAPIerror(res.message);
      } else if (res.success === 1) {
        setAPIsuccess(res.message);
      } else if (res.success === 2) {
        setlinkExpired({ message: res.message, id: res.id });
      }
    });
  }, []);
  return (
    <>
      <div className="container border w-full mt-4 h-full md:min-h-[400px] lg:min-h-[550px] text-primary bg-light2">
        <div className="w-fit mx-auto flex flex-col items-center">
          <div>
            <img
              src={setpassword}
              alt=""
              className="h-48 w-48 lg:h-96 lg:w-96"
            />
          </div>
          {APIerror.length > 0 && (
            <div className="text-xl text-secondary  bg-warning rounded py-2 my-2 px-2">
              {APIerror}
            </div>
          )}
          {linkExpired.message.length > 0 && (
            <div>
              <RegenerateLink
                id={linkExpired.id}
                token={params.token}
                regenerateLinkResponse={handleRegenerateLinkResponse}
              />
            </div>
          )}
          {APIsuccess.length > 0 && (
            <div className="text-xl text-secondary flex bg-success rounded p-2 my-2"></div>
          )}
        </div>
      </div>
    </>
  );
}
