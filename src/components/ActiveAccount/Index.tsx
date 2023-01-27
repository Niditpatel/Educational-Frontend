import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

import setpassword from "../../Images/setpassword.png";

import PasswordField from "../common/Fields/PasswordField";
import { ResetPasswordSchema } from "../../models/ResetPasswordModel";

import {
  RegenerateLink as RegenerateLinkService,
  ResetPassword as ResetPasswordService,
  ActivateAccount as ActiveAccountService,
} from "../../AuthService";

export default function ActiveAccount() {
  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState({
    message: "",
    id: "",
    isFor: "",
  });
  const [APIsuccessfinal, setAPIsuccessfinal] = useState("");
  const [linkExpired, setlinkExpired] = useState({ message: "", id: "" });

  const params = useParams();
  const { handleLoading } = useOutletContext<any>();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ResetPasswordSchema),
  });

  const handleRegenerateLink = async () => {
    setlinkExpired({ ...linkExpired, message: "" });
    handleLoading(true);
    const res = await RegenerateLinkService({
      isFor: "activeAccount",
      token: params.token,
      id: linkExpired.id,
    });
    if (res.success === 1) {
      setAPIsuccessfinal(res.message);
      handleLoading(false);
    } else if (res.success === 0) {
      setAPIerror(res.message);
      handleLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setAPIsuccess({ ...APIsuccess, message: "" });
    handleLoading(true);
    const res = await ResetPasswordService({
      password: data.password,
      id: APIsuccess.id,
      isFor: APIsuccess.isFor,
    });
    if (res.success === 0) {
      setAPIerror(res.message);
      handleLoading(false);
    } else if (res.success === 1) {
      setAPIsuccessfinal(res.message);
      handleLoading(false);
    }
  };

  useEffect(() => {
    ActiveAccountService(params.token).then((res) => {
      if (res.success === 0) {
        setAPIerror(res.message);
      } else if (res.success === 1) {
        setAPIsuccess({ message: res.message, id: res.id, isFor: res.isFor });
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
          {APIsuccessfinal.length > 0 && (
            <div className="text-xl text-secondary  bg-success rounded py-2 my-2 px-2">
              {APIsuccessfinal}
            </div>
          )}
          {linkExpired.message.length > 0 && (
            <div>
              <p className="">
                Link is expired please{" "}
                <button
                  className="underline text-light1 active:text-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRegenerateLink();
                  }}
                >
                  click Here
                </button>{" "}
                to regenerate Link
              </p>
            </div>
          )}
          {APIsuccess.message.length > 0 && (
            <div className=" text-primary  w-full max-w-[420px] rounded p-2 my-2">
              <div className="text">
                {" "}
                Set password for your account to activate account{" "}
              </div>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="w-full"
                >
                  <PasswordField fieldname="password" label="Password" />
                  <PasswordField
                    fieldname="confirmPassword"
                    label="Confirm Password"
                  />
                  <button
                    type="submit"
                    className={`px-10  font-semibold border border-light1 text-lg mt-3  rounded-xl text-center subpixel-antialiased 
                       ${
                         methods.formState.isValid
                           ? "text-primary"
                           : "text-light1"
                       }`}
                  >
                    submit
                  </button>
                </form>
              </FormProvider>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
