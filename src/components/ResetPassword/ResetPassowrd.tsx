import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

import PasswordField from "../common/Fields/PasswordField";
import { ResetPasswordSchema } from "../../models/ResetPasswordModel";

import {
  ResetPassword as ResetPasswordService,
  CheckForResetPassword as CheckForResetPasswordService,
  RegenerateLink as RegenerateLinkService,
} from "../../AuthService";

import { AiOutlineWarning } from "react-icons/ai";
import resetpassword from "../../Images/resetpassword.jpg";

export default function ResetPassword() {
  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState({
    message: "",
    id: "",
    isFor: "",
  });
  const [linkExpired, setlinkExpired] = useState({ message: "", id: "" });
  const [APIsuccessfinal, setAPIsuccessfinal] = useState("");

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ResetPasswordSchema),
  });

  const params = useParams();
  const { handleLoading } = useOutletContext<any>();

  const onSubmit = async (data: any) => {
    handleLoading(true);
    setAPIsuccess({ ...APIsuccess, message: "" });
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

  // for link expired
  const handleRegenerateLink = async () => {
    setlinkExpired({ ...linkExpired, message: "" });
    const res = await RegenerateLinkService({
      isFor: "resetPassword",
      token: params.token,
      id: linkExpired.id,
    });
    if (res.success === 1) {
      setAPIsuccessfinal(res.message);
    } else if (res.success === 0) {
      setAPIerror(res.message);
    }
  };

  useEffect(() => {
    setAPIerror("");
    setAPIsuccess({ message: "", id: "", isFor: "" });
    setlinkExpired({ message: "", id: "" });
    CheckForResetPasswordService({
      token: params.token,
      isFor: "resetpassword",
    }).then((res) => {
      if (res.success === 0) {
        setAPIerror(res.message);
      } else if (res.success === 1) {
        setAPIsuccess({ message: res.message, id: res.id, isFor: res.isFor });
      } else if (res.success === 2) {
        setlinkExpired({ message: res.message, id: res.userId });
      }
    });
  }, []);

  return (
    <>
      <div className="bg-light2 text-primary lg:py-10 lg:min-h-[550px] ">
        <div className="container flex flex-col lg:flex-row-reverse justify-between">
          <div className="basis-1/2   flex items-center ">
            <img
              src={resetpassword}
              alt=""
              className="h-48 w-48 md:h-72 md:w-72  mx-auto "
            />
          </div>
          {/* errors from api  */}
          {APIerror.length > 0 && (
            <div className="flex justify-center  items-center basis-1/2 ">
              <div className="text-xl h-fit text-secondary flex space-x-4  items-center bg-warning rounded py-2 px-2 my-2">
                <AiOutlineWarning className="text-5xl" />{" "}
                <span>{APIerror}</span>
              </div>
            </div>
          )}
          {/* success msg  */}
          {APIsuccessfinal.length > 0 && (
            <div className="flex justify-center  items-center basis-1/2 ">
              <div className="text-xl h-fit text-secondary  bg-success rounded py-2 px-2 my-2">
                <span>{APIsuccessfinal}</span>
              </div>
            </div>
          )}
          {/* Link expired  */}
          {linkExpired.message.length > 0 && (
            <div className="flex justify-center  items-center basis-1/2 ">
              <div className="text-xl h-fit text-primary  py-2 px-2 my-2">
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
            </div>
          )}
          {APIsuccess.message.length > 0 && (
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="p-5  basis-1/2"
              >
                <div className=" mx-auto lg:py-10 mt-8 max-w-[420px]">
                  <div className="text-center text-3xl capitalize">
                    Reset password
                  </div>
                  <PasswordField
                    label="Password"
                    fieldname="password"
                  ></PasswordField>
                  <PasswordField
                    label="Confirm Password"
                    fieldname="confirmPassword"
                  ></PasswordField>
                  <div className="mt-6 mb-3">
                    <button
                      type="submit"
                      className={`px-10  font-semibold border border-light1 text-lg  rounded-xl text-center subpixel-antialiased 
              ${methods.formState.isValid ? "text-primary" : "text-light1"}`}
                    >
                      submit
                    </button>
                  </div>
                </div>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </>
  );
}
