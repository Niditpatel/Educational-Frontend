import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { UseDifferentValueCheck } from "../../common/CustomHooks/UseDifferentValueCheck";

import { CreateUserModelSchema } from "../../../models/CreateUserModel";

import {
  AsyncSingleSelect,
  SingleSelect,
} from "../../common/Fields/SelectField";
import TextField from "../../common/Fields/TextField";

import {
  GetTitles as GetTitlesService,
  GetInstitutes as GetInstitutesService,
} from "../../../GetDataService";
import {
  Get as GetDataService,
  Update as UpdateDataService,
} from "../../../CurdService";
import { ForgotPassword as ForgotPasswordService } from "../../../AuthService";

export default function UpdateUser(props: any) {
  let userId = props.userId;

  const [Title, setTitle] = useState([]);
  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);

  const [userData, setuserData] = useState({});
  const [userApproved, setuserApproved] = useState(false);

  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState("");

  const [LoggedUser, setLoggedUser] = useState<any>();

  const { handleLoading } = useOutletContext<any>();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateUserModelSchema),
  });

  const onSubmit = async (data: any) => {
    const updatedData = {
      role: data.role.value,
      title: data.title.value,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      institute: data.institute.value,
    };
    const checkForUpdate = UseDifferentValueCheck(updatedData, userData);
    if (checkForUpdate) {
      const token = sessionStorage.getItem("Access");
      setuserData(updatedData);
      setAPIerror("");
      setAPIsuccess("");
      handleLoading(true);
      const { institute, title, role, ...restData } = data;
      const editUserId = sessionStorage.getItem("editUserId");

      const res = await UpdateDataService(
        "user/" + editUserId,
        {
          institute: institute.value,
          title: title.value,
          role: role.value,
          ...restData,
        },
        token,
        {}
      );
      if (res.success === 1) {
        setAPIsuccess(res.message);
        handleLoading(false);
        props.viewUpdatedData(true);
      } else {
        setAPIerror(res.message);
        handleLoading(false);
      }
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

  const HandlePasswordReset = async () => {
    setAPIsuccess("");
    setAPIerror("");
    const res = await ForgotPasswordService({
      email: methods.getValues("email"),
    });
    if (res.success === 0) {
      setAPIerror(res.message);
    } else {
      setAPIsuccess(res.message);
    }
  };

  useEffect(() => {
    handleLoading(true);
    setAPIsuccess("");
    setAPIerror("");

    const token = sessionStorage.getItem("Access");
    const user: any = sessionStorage.getItem("User");
    const logUser = user !== null ? JSON.parse(user) : user;
    setLoggedUser(logUser);

    GetTitlesService().then((data) => {
      const titles = data.map((value: any) => {
        return { label: value, value: value };
      });
      setTitle(titles);
      handleLoading(false);
    });

    const editUserId = sessionStorage.getItem("editUserId");

    GetDataService("user/" + editUserId, token, {}).then((res) => {
      if (res.success === 1) {
        const user = res.user;
        console.log(user, "user");

        setuserApproved(user.Approved);

        methods.setValue("email", user.email);
        methods.setValue("firstName", user.firstName);
        methods.setValue("lastName", user.lastName);
        methods.setValue("role", { label: user.role, value: user.role });
        methods.setValue("title", { label: user.title, value: user.title });
        methods.setValue("institute", {
          label: user.institute.name.toUpperCase(),
          value: user.institute._id,
        });
        setuserData({
          role: user.role,
          title: user.title,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          institute: user.institute._id,
        });
      }
      handleLoading(false);
    });
  }, [userId]);

  const HandleUserApprove = () => {
    setAPIsuccess("");
    setAPIerror("");
    handleLoading(true);
    const token = sessionStorage.getItem("Access");
    const editUserId = sessionStorage.getItem("editUserId");
    UpdateDataService("user/approved/" + editUserId, {}, token, {}).then(
      (res: any) => {
        if (res.success === 1) {
          setAPIsuccess(res.message);
          props.viewUpdatedData(true);
          setuserApproved(true);
        } else {
          setAPIerror(res.message);
        }
      }
    );
    return handleLoading(false);
  };

  return (
    <>
      <div className="flex justify-center">
        {APIerror.length > 0 && (
          <div className="bg-warning rounded p-2 capitalize">{APIerror}</div>
        )}
        {APIsuccess.length > 0 && (
          <div className="bg-success p-2 rounded capitalize">{APIsuccess}</div>
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
                isSearchable={false}
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
              </>
            )}
          </div>
          <div className="flex items-center justify-center space-x-4 mt-5">
            <button
              type="submit"
              className="border border-primary w-32 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary"
            >
              Update
            </button>
            <button
              className="border border-primary w-32 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                HandlePasswordReset();
              }}
            >
              Reset Password
            </button>
            {userApproved === false && (
              <button
                className="border border-primary w-32 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  HandleUserApprove();
                }}
              >
                Approve User
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
