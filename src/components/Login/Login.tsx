import { Login as LoginService } from "../../AuthService";
import { AiOutlineWarning } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../common/Fields/TextField";
import PasswordField from "../common/Fields/PasswordField";
import login from "../../Images/login.jpg";
import { LoginDetailSchema } from "../models/LoginModel";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [APIerror, setAPIerror] = useState();
  const navigate = useNavigate();
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginDetailSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(process.env.REACT_APP_API_URL);
    const res = await LoginService(data);
    if (res.success === 1) {
      sessionStorage.setItem("Access", res.token);
      sessionStorage.setItem("User", JSON.stringify(res.LOGuser));
      navigate("/admin");
    } else {
      setAPIerror(res.message);
    }
  };
  return (
    <div className="bg-light2 text-primary">
      <div className="container flex flex-col lg:flex-row-reverse justify-between">
        <div className="basis-1/2">
          <img
            src={login}
            alt=""
            className="h-96 w-96  mx-auto lg:h-full lg:w-full"
          />
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="p-5  basis-1/2"
          >
            <div className=" mx-auto lg:py-20 mt-8 max-w-[420px]">
              <div className="text-3xl text-center">Login</div>
              {/* error from apis */}
              {APIerror && (
                <div className="text-xl text-secondary flex space-x-4 bg-warning rounded py-2 my-2 px-2">
                  <AiOutlineWarning className="text-5xl" />{" "}
                  <span>{APIerror} try again</span>
                </div>
              )}
              <TextField
                label="Email"
                fieldname="email"
                type="email"
                required={true}
              />
              <PasswordField label="password" fieldname="password" />
              <div className="text-sm capitalize mt-1">
                <Link to={"/forgotpassword"}>forgot password ?</Link>
              </div>
              <div className="mt-6 mb-3">
                <button
                  type="submit"
                  className={`px-10  font-semibold border border-light1 text-lg  rounded-xl text-center subpixel-antialiased 
              ${methods.formState.isValid ? "text-primary" : "text-light1"}`}
                  // disabled={!methods.formState.isValid}
                >
                  Login
                </button>
              </div>
              <div>
                <small className="capitalize ">
                  {" "}
                  don't have account?{" "}
                  <Link to="/signup" className="text-secondary">
                    sign up
                  </Link>
                </small>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
