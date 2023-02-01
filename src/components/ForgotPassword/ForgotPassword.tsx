import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { Link } from "react-router-dom";

import TextField from "../common/Fields/TextField";
import { ForgotPassword as ForgotPasswordService } from "../../AuthService";
import { ForgotPasswordSchema } from "../../models/ForgotPasswordModel";

import { AiOutlineWarning } from "react-icons/ai";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import forgotpassword from "../../Images/forgotpassword.jpg";

export default function ForgotPassword() {
  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState("");

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: any) => {
    const res = await ForgotPasswordService(data);
    if (res.success === 0) {
      setAPIerror(res.message);
      setAPIsuccess("");
    } else {
      setAPIerror("");
      setAPIsuccess(res.message);
    }
  };
  return (
    <>
      <div className="bg-light2 text-primary  xl:min-h-[600px] flex items-centrer justify-center">
        <div className="container flex flex-col lg:flex-row-reverse justify-between">
          <div className="basis-1/2   flex items-center ">
            <img
              src={forgotpassword}
              alt=""
              className="h-48 w-48 md:h-96 md:w-96  mx-auto "
            />
          </div>
          {/* success msg  */}
          {APIsuccess.length > 0 && (
            <div className="basis-1/2 flex justify-center  items-center  ">
              <div className="my-3 h-fit rounded bg-success px-2 py-1">
                {APIsuccess}
              </div>
            </div>
          )}
          {APIsuccess.length === 0 && (
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="p-5 basis-1/2"
              >
                <div className=" mx-auto lg:py-20 md:mt-8 max-w-[420px]">
                  <div className="text-center text-3xl capitalize">
                    forgot password
                  </div>
                  {/* errors from api  */}
                  {APIerror.length > 0 && (
                    <div className="text-xl text-secondary flex space-x-4 bg-warning items-center rounded py-2 px-2 my-2">
                      <AiOutlineWarning className="text-5xl" />{" "}
                      <span className="capitalize">{APIerror}</span>
                    </div>
                  )}
                  <div className="mt-5">
                    Enter Your Ragistered Email Address
                  </div>
                  <TextField
                    label="Email"
                    fieldname="email"
                    required={true}
                  ></TextField>
                  <div className="mt-6 mb-3">
                    <button
                      type="submit"
                      className={`px-10  font-semibold border border-light1 text-lg  rounded-xl text-center subpixel-antialiased  capitalize
              ${methods.formState.isValid ? "text-primary" : "text-light1"}`}
                    >
                      submit
                    </button>
                  </div>
                  <div className="text-sm">
                    <Link to={"/login"} className="flex items-center space-x-2">
                      <HiOutlineArrowNarrowLeft />
                      <span className="capitalize"> back to login </span>
                    </Link>
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
