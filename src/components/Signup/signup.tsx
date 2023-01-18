import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineWarning } from "react-icons/ai";
import TextField from "../common/Fields/TextField";
import PasswordField from "../common/Fields/PasswordField";
import { SingleSelect, AsyncSingleSelect } from "../common/Fields/SelectField";
import {
  GetTitles as GetTitlesService,
  GetInstitutes as GetInstitutesService,
} from "../../GetDataService";
import { Signup as SingupService } from "../../AuthService";
import { SignupDetailSchema } from "../../models/SingupModel";
import { Link } from "react-router-dom";
import CheckboxField from "../common/Fields/CheckboxField";
import singup from "../../Images/singup.jpg";

export default function Signup() {
  const [Titles, setTitles] = useState([]);
  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState("");
  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupDetailSchema),
  });
  const onSubmit = async (data: any) => {
    setAPIerror("");
    setAPIsuccess("");
    const { confirmPassword, title, institute, terms, ...rest } = data;
    const res = await SingupService({
      ...rest,
      title: data.title.value,
      institute: data.institute.value,
    });
    if (res.success === 0) {
      setAPIerror(res.message);
      methods.reset();
    } else {
      setAPIsuccess(res.message);
      methods.reset();
    }
  };

  const selectInstitute = async (inputValue: string) => {
    if (inputValue.length > 2) {
      const res = await GetInstitutesService(inputValue);
      const institutes = res.map((val: any) => {
        return { label: val.name.toUpperCase(), value: val._id };
      });
      setCahcheInstitute([...institutes]);
      return institutes;
    }
    // else {
    //  return CahcheInstitute;
    // }
  };

  useEffect((): any => {
    GetTitlesService().then((data) => {
      const titles = data.map((value: any) => {
        return { label: value, value: value };
      });
      setTitles(titles);
    });
    // return false;
  }, []);

  return (
    <div className=" bg-light2   text-primary">
      <div className="container flex flex-col lg:flex-row justify-between">
        <div className="basis-1/2 flex items-center lg:py-20  ">
          <img
            src={singup}
            alt=""
            className="h-96 w-96  mx-auto lg:h-[615px] lg:w-full"
          />
        </div>
        {APIerror.length > 0 && (
          <div className="flex justify-center  items-center basis-1/2 ">
            <div className="text-xl h-fit  text-secondary flex bg-warning rounded p-2 my-2">
              <AiOutlineWarning className="text-3xl" /> {APIerror}
            </div>
          </div>
        )}
        {APIsuccess.length > 0 && (
          <div className="flex justify-center  items-center basis-1/2 ">
            <div className="text-xl h-fit  text-secondary flex bg-success rounded p-2 my-2">
              <AiOutlineWarning className="text-3xl" /> {APIsuccess}
            </div>
          </div>
        )}
        {APIsuccess.length === 0 && APIerror.length === 0 && (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="p-5  basis-1/2"
            >
              <div className="  mx-auto py-2 mt-8 max-w-[420px]  ">
                <div className="text-3xl text-center">sign up</div>
                <AsyncSingleSelect
                  placeholder="Search Institute"
                  fieldname="institute"
                  loadOptions={selectInstitute}
                  instituteDefaultOptions={CahcheInstitute}
                  required={true}
                />
                <TextField
                  label="Email"
                  fieldname="email"
                  type="email"
                  required={true}
                />
                <SingleSelect
                  fieldname="title"
                  placeholder="Select Title"
                  options={Titles}
                  isSearchable={false}
                  required={true}
                />
                <TextField
                  label="First Name"
                  fieldname="firstName"
                  required={true}
                />
                <TextField
                  label="Last Name"
                  fieldname="lastName"
                  required={true}
                />
                <PasswordField label="Password" fieldname="password" />
                <PasswordField
                  label="Confirm Password"
                  fieldname="confirmPassword"
                />
                <CheckboxField label="hello" fieldname="terms">
                  <label className="text-sm ">
                    I agree to OneEducation's{" "}
                    <Link className="text-secondary" to={"#"}>
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link className="text-secondary" to={"#"}>
                      Privacy Policy
                    </Link>
                  </label>
                </CheckboxField>
                <div className="mt-6">
                  <button
                    type="submit"
                    className={`px-10  font-semibold border border-light1 text-lg  rounded-xl text-center subpixel-antialiased 
              ${methods.formState.isValid ? "text-primary" : "text-light1"}`}
                  >
                    Register
                  </button>
                </div>
                <div>
                  <small className="capitalize ">
                    {" "}
                    already have account?{" "}
                    <Link to="/login" className="text-secondary">
                      login
                    </Link>
                  </small>
                </div>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
}
