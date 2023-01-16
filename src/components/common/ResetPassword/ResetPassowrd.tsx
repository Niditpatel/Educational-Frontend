import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordField from "../Fields/PasswordField";
import { useState } from "react";
import { ResetPassword as ResetPasswordService } from "../../../AuthService";
import { ResetPasswordSchema } from "../../models/ResetPasswordModel";
import { AiOutlineWarning } from "react-icons/ai";
import resetpassword from "../../../Images/resetpassword.jpg";
export default function ResetPassword() {
  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState("");
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ResetPasswordSchema),
  });
  const onSubmit = async (data: any) => {
    setAPIsuccess("");
    setAPIerror("");
    const res = await ResetPasswordService({ password: data.password });
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
      <div className="bg-light2 text-primary border">
        <div className="container flex flex-col lg:flex-row-reverse justify-between">
          <div className="basis-1/2  border flex items-center ">
            <img
              src={resetpassword}
              alt=""
              className="h-48 w-48 md:h-72 md:w-72 border mx-auto "
            />
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="p-5 border basis-1/2"
            >
              <div className="text-center text-3xl capitalize">
                Reset password
              </div>
              <div className="border mx-auto lg:py-10 mt-8 max-w-[420px]">
                {/* errors from api  */}
                {APIerror.length > 0 && (
                  <div className="text-xl text-secondary flex space-x-4 bg-warning rounded py-2 px-2 my-2">
                    <AiOutlineWarning className="text-5xl" />{" "}
                    <span>{APIerror} try again</span>
                  </div>
                )}
                {/* success msg  */}
                {APIsuccess.length > 0 && (
                  <div className="my-3 rounded bg-success px-2 py-1">
                    {APIsuccess}
                  </div>
                )}
                <PasswordField
                  label="Password"
                  fieldname="password"
                ></PasswordField>
                <PasswordField
                  label="Conform Password"
                  fieldname="conformPassword"
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
        </div>
      </div>
    </>
  );
}
