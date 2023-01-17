import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordField from "../Fields/PasswordField";
import { useState } from "react";
import { ResetPassword as ResetPasswordService } from "../../../AuthService";
import { ResetPasswordSchema } from "../../../models/ResetPasswordModel";
import { AiOutlineWarning } from "react-icons/ai";
import resetpassword from "../../../Images/resetpassword.jpg";
import { useParams } from "react-router-dom";
export default function ResetPassword() {
  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState("");
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ResetPasswordSchema),
  });
  const params = useParams();
  const onSubmit = async (data: any) => {
    setAPIsuccess("");
    setAPIerror("");
    const res = await ResetPasswordService({
      password: data.password,
      token: params.token,
    });
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
              <div className="text-xl h-fit text-secondary flex space-x-4 bg-warning rounded py-2 px-2 my-2">
                <AiOutlineWarning className="text-5xl" />{" "}
                <span>{APIerror} try again</span>
              </div>
            </div>
          )}
          {/* success msg  */}
          {APIsuccess.length > 0 && (
            <div className="flex justify-center  items-center basis-1/2 ">
              <div className="my-3 h-fit rounded bg-success px-2 py-1">
                {APIsuccess}
              </div>
            </div>
          )}
          {APIsuccess.length === 0 && APIerror.length === 0 && (
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
                      // disabled={!methods.formState.isValid}
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
