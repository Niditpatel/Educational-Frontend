import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import {
  AsyncSingleSelect,
  SingleSelect,
} from "../../common/Fields/SelectField";
import TextField from "../../common/Fields/TextField";

import {
  GetTitles as GetTitlesService,
  GetInstitutes as GetInstitutesService,
} from "../../../GetDataService";

import { CreateUserModelSchema } from "../../../models/CreateUserModel";
import { Signup as RegisterService } from "../../../AuthService";

export default function CreateUser(props: any) {
  const [Title, setTitle] = useState([]);
  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);

  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState("");

  const [LoggedUser, setLoggedUser] = useState<any>();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateUserModelSchema),
    defaultValues: {
      role: null,
      title: null,
      institute: LoggedUser
        ? LoggedUser.role === "SchoolAdmin"
          ? {}
          : null
        : null,
    },
  });

  const { handleLoading } = useOutletContext<any>();

  const onSubmit = async (data: any) => {
    setAPIsuccess("");
    setAPIerror("");
    const { role, title, institute, ...restUserDetail } = data;
    handleLoading(true);
    const res = await RegisterService({
      role: data.role.value,
      title: data.title.value,
      institute: data.institute.value,
      ...restUserDetail,
    });
    if (res.success === 0) {
      handleLoading(false);
      setAPIerror(res.message);
    } else {
      setAPIsuccess(res.message);
      methods.reset();
      handleLoading(false);
      props.viewCreatedData(true);
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
  };

  useEffect(() => {
    const token = sessionStorage.getItem("Access");
    const user: any = sessionStorage.getItem("User");
    const logUser = user !== null ? JSON.parse(user) : user;
    setLoggedUser(logUser);
    GetTitlesService().then((data) => {
      const titles = data.map((value: any) => {
        return { label: value, value: value };
      });
      setTitle(titles);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center">
        {APIerror.length > 0 && (
          <div className="bg-warning rounded p-2">{APIerror}</div>
        )}
        {APIsuccess.length > 0 && (
          <div className="bg-success p-2 rounded">{APIsuccess}</div>
        )}
      </div>
      <FormProvider {...methods}>
        <form action="" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="w-full mt-5">
              <SingleSelect
                fieldname="role"
                placeholder="Select Role"
                required={true}
                options={props.roles}
              />
            </div>
            <div className="w-full mt-5">
              <SingleSelect
                fieldname="title"
                placeholder="Select Title"
                options={Title}
                isSearchable={false}
                required={true}
              />
            </div>
            <div>
              <TextField
                fieldname="firstName"
                label="First Name"
                required={true}
              />
            </div>
            <div>
              <TextField
                fieldname="lastName"
                label="Last Name"
                required={true}
              />
            </div>
            <div>
              <TextField
                fieldname="email"
                type="email"
                label="Email"
                required={true}
              />
            </div>
            {LoggedUser && (
              <>
                {LoggedUser.role === "SuperAdmin" && (
                  <div>
                    <AsyncSingleSelect
                      fieldname="institute"
                      placeholder="Select Institute"
                      loadOptions={selectInstitute}
                      instituteDefaultOptions={CahcheInstitute}
                      required={true}
                    />
                  </div>
                )}
                {LoggedUser.role !== "SuperAdmin" && (
                  <>
                    {methods.setValue("institute", {
                      label: LoggedUser.institute,
                      value: LoggedUser.institute,
                    })}
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-center mt-5">
            <button
              type="submit"
              className="border border-primary w-32 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary "
            >
              Create User
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
