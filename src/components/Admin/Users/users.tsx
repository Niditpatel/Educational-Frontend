import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AsyncMultiSingleSelect } from "../../common/Fields/SelectField";

import { useEffect, useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import { GetInstitutes as GetInstitutesService } from "../../../GetDataService";
import {
  Get as GetDataService,
  Delete as DeleteDataService,
} from "../../../CurdService";

import { MdClose } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

import { SearchUsersModel } from "../../../models/searchUsersModel";

import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import Table from "../../common/Table/Table";
import Modal from "../../common/Modal/Modal";

export default function Users() {
  const [selectRoles, setselectRoles] = useState<any>([]);
  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);

  const [Count, setCount] = useState<any>();
  const [TotalData, setTotalData] = useState<any>();

  const [Users, setUsers] = useState<[]>([]);

  const [DeleteUser, setDeleteUser] = useState("");
  const [DeleteUserRespone, setDeleteUserRespone] = useState("");

  const [ActionUserid, setActionUserid] = useState("");
  const [action, setaction] = useState("search");

  const [limitAndOffset, setlimitAndOffset] = useState({
    limit: 5,
    offset: 0,
  });

  const [LoggedUser, setLoggedUser] = useState<any>();

  const { handleLoading } = useOutletContext<any>();

  const [viewNewData, setviewNewData] = useState(false);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(SearchUsersModel),
    defaultValues: {
      query: null,
      limit: 5,
      offset: 0,
      search_schools: [],
      role: [],
    },
  });

  const GetUsers = useMemo(async () => {
    const token = sessionStorage.getItem("Access");
    handleLoading(true);
    const res: { success: Number; data: []; message: String; count: any } =
      await GetDataService("user/", token, {
        query: methods.getValues("query"),
        limit: methods.getValues("limit"),
        offset: methods.getValues("offset"),
        search_schools:
          methods.getValues("search_schools") !== undefined
            ? methods
                .getValues("search_schools")
                .map((item: any) => item.value)
                .join("&&")
            : "",
        role:
          methods.getValues("role") !== undefined
            ? methods
                .getValues("role")
                .map((item: any) => item.value)
                .join("&&")
            : "",
      });
    if (res.success === 1) {
      setUsers(res.data);
      setTotalData(res.count);
      setCount(Math.ceil(parseInt(res.count) / methods.getValues("limit")));
      handleLoading(false);
    }
    return true;
  }, [limitAndOffset, DeleteUserRespone, viewNewData]);

  const onSubmit = async (data: any) => {
    methods.setValue("limit", 5);
    methods.setValue("offset", 0);
    sessionStorage.setItem("limit", "5");
    sessionStorage.setItem("offset", "0");
    const token = sessionStorage.getItem("Access");

    if (data.role !== undefined) {
      sessionStorage.setItem("role", JSON.stringify(data.role));
    }
    if (data.search_schools !== undefined) {
      sessionStorage.setItem(
        "search_schools",
        JSON.stringify(data.search_schools)
      );
    }
    sessionStorage.setItem("query", JSON.stringify(data.query));

    handleLoading(true);
    GetDataService("user/", token, {
      query: data.query,
      role:
        data.role !== undefined
          ? data.role.map((item: any) => item.value).join("&&")
          : "",
      search_schools:
        data.search_schools !== undefined
          ? data.search_schools.map((item: any) => item.value).join("&&")
          : "",
      offset: data.offset,
      limit: data.limit,
    }).then((res: any) => {
      if (res.success === 1) {
        handleLoading(false);
        setUsers(res.data);
        setTotalData(res.count);
        setCount(Math.ceil(parseInt(res.count) / data.limit));
      } else {
        setTotalData(0);
        setCount(0);
        handleLoading(false);
        setUsers([]);
      }
    });
  };

  useEffect(() => {
    handleLoading(true);

    const user: any = sessionStorage.getItem("User");
    const logUser = user !== null ? JSON.parse(user) : user;
    setLoggedUser(logUser);
    const action = sessionStorage.getItem("action");
    setaction(action !== undefined && action !== null ? action : "search");

    const token = sessionStorage.getItem("Access");

    const query = sessionStorage.getItem("query");
    const role = sessionStorage.getItem("role");
    const search_schools = sessionStorage.getItem("search_schools");
    const offset = sessionStorage.getItem("offset");
    const limit = sessionStorage.getItem("limit");

    if (query !== null && query !== undefined) {
      methods.setValue("query", JSON.parse(query));
    }
    if (limit !== null && limit !== undefined) {
      methods.setValue("limit", JSON.parse(limit));
    }
    if (offset !== null && offset !== undefined) {
      methods.setValue("offset", JSON.parse(offset));
    }

    // getting roles
    GetDataService("roles", token, {}).then((res) => {
      handleLoading(false);
      if (res.success === 1) {
        const options = res.data.map((val: any) => {
          return { label: val, value: val };
        });
        setselectRoles([...options]);
      }
    });

    GetDataService("user/", token, {
      query: query !== undefined && query !== null ? JSON.parse(query) : "",
      role:
        role !== undefined && role !== null
          ? JSON.parse(role)
              .map((item: any) => item.value)
              .join("&&")
          : "",
      search_schools:
        search_schools !== undefined && search_schools !== null
          ? JSON.parse(search_schools)
              .map((item: any) => item.value)
              .join("&&")
          : "",
      offset: offset !== undefined && offset !== null ? offset : 0,
      limit: limit !== undefined && limit !== null ? limit : 5,
    }).then((res: any) => {
      if (res.success === 1) {
        handleLoading(false);
        setUsers(res.data);
        if (limit !== undefined && limit !== null) {
          setTotalData(res.count);
          setCount(Math.ceil(parseInt(res.count) / parseInt(limit)));
        } else {
          setCount(Math.ceil(parseInt(res.count) / 5));
        }
      } else {
        setUsers([]);
        setTotalData(0);
        setCount(0);
      }
    });

    return handleLoading(false);
  }, []);

  // for search institutes
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

  // for delete user
  function handleDelete() {
    handleLoading(true);
    const token = sessionStorage.getItem("Access");
    DeleteDataService("user/", token, DeleteUser).then((res) => {
      handleLoading(false);
      setDeleteUserRespone(res.message);
    });
  }

  // for view the latest data
  const HandleNewData = (value: boolean) => {
    if (viewNewData === true) setviewNewData(false);
    else setviewNewData(value);
  };

  // for edit user
  const handleUserEdit = (data: any) => {
    setActionUserid(data);
    setaction("edit");
  };

  // conformation for delete
  const handleUserDelete = (data: any) => {
    setDeleteUser(data);
    document.getElementById("confirmModalToggleButton")?.click();
  };

  return (
    <div className=" container px-2 text-primary">
      <div className="capitalize text-lg">Users</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className=" mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div className="w-full pr-4">
              <label htmlFor="" className="capitalize">
                search
              </label>
              <br />
              <input
                type="text"
                id=""
                className="border rounded light1-placeholder w-full p-4  focus:outline-none"
                placeholder="Search..."
                {...methods.register("query")}
              />
            </div>
            <div
              className={`${
                LoggedUser
                  ? LoggedUser.role === "SuperAdmin"
                    ? "show"
                    : "hidden"
                  : "hidden"
              }`}
            >
              <label htmlFor="" className="capitalize">
                institution
              </label>
              <br />
              <AsyncMultiSingleSelect
                fieldname="search_schools"
                placeholder="Select"
                loadOptions={selectInstitute}
                defaultOptions={CahcheInstitute}
              />
            </div>
            <div>
              <label htmlFor="" className="capitalize">
                role
              </label>
              <br />
              <AsyncMultiSingleSelect
                fieldname="role"
                placeholder="Select"
                loadOptions={selectRoles}
                defaultOptions={selectRoles}
                isSearchable={false}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between  mt-5 md:mt-3">
            <div className="flex space-x-8">
              <button
                type="submit"
                className="border border-primary w-32 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary "
              >
                search
              </button>
              <button
                className="border border-primary w-32 text-center bg-primary text-white py-1  capitalize hover:bg-white hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  methods.reset();
                  sessionStorage.removeItem("query");
                  sessionStorage.removeItem("search_schools");
                  sessionStorage.removeItem("role");
                }}
              >
                reset
              </button>
            </div>
            <div>
              <button
                className="underline capitalize"
                onClick={(e) => {
                  e.preventDefault();
                  setaction("new");
                  sessionStorage.setItem("action", "new");
                }}
              >
                &#43; create user
              </button>
            </div>
          </div>
          <div>
            <div className="conatiner py-1  mt-5" id="userTableParentDiv">
              {Users && (
                <>
                  {Users.length > 0 && (
                    <Table
                      data={Users}
                      isFor={"User"}
                      handleEdit={handleUserEdit}
                      handleDelete={handleUserDelete}
                    >
                      <div>
                        showing{" "}
                        {methods.getValues("offset") *
                          methods.getValues("limit")}{" "}
                        -{" "}
                        {TotalData <
                        (methods.getValues("offset") + 1) *
                          methods.getValues("limit")
                          ? TotalData
                          : (methods.getValues("offset") + 1) *
                            methods.getValues("limit")}{" "}
                        of {TotalData} results
                      </div>
                    </Table>
                  )}
                </>
              )}
              {Users.length === 0 && (
                <>
                  <div className="capitalize w-full  text-center text-3xl mt-10">
                    There is No Data To show
                  </div>
                </>
              )}
            </div>
            {Users.length !== 0 && (
              <div className="flex my-5 justify-between">
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const offset = methods.getValues("offset");
                      if (offset > 0) {
                        methods.setValue("offset", offset - 1);
                        sessionStorage.setItem(
                          "offset",
                          (offset - 1).toString()
                        );
                        setlimitAndOffset({
                          ...limitAndOffset,
                          offset: offset - 1,
                        });
                      }
                    }}
                  >
                    <BsFillCaretLeftFill />
                  </button>
                  <input
                    type="number"
                    id="offsetForUserManagement"
                    className="w-10 mx-3 text-center appearance-none border-b border-primary focus:outline-none "
                    {...methods.register("offset")}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/e/g, "");
                      if (parseInt(e.target.value) > parseInt(Count) - 1) {
                        e.target.value = (parseInt(Count) - 1).toString();
                      }
                      if (e.target.value.length > 0) {
                        methods.setValue("offset", parseInt(e.target.value));
                        setlimitAndOffset({
                          ...limitAndOffset,
                          offset: parseInt(e.target.value),
                        });
                        sessionStorage.setItem("offset", e.target.value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.code === "KeyE") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const offset = limitAndOffset.offset;
                      if (offset < parseInt(Count) - 1) {
                        methods.setValue("offset", offset + 1);
                        sessionStorage.setItem(
                          "offset",
                          (offset + 1).toString()
                        );
                        setlimitAndOffset({
                          ...limitAndOffset,
                          offset: offset + 1,
                        });
                      }
                    }}
                  >
                    <BsFillCaretRightFill />
                  </button>
                </div>
                <div>
                  <label htmlFor="">Display </label>
                  <select
                    id=""
                    className="bg-white focus:outline-none border-b "
                    {...methods.register("limit")}
                    onChange={(e) => {
                      e.preventDefault();
                      sessionStorage.setItem("limit", e.target.value);
                      methods.setValue("limit", parseInt(e.target.value));
                      methods.setValue("offset", 0);
                      sessionStorage.setItem("offset", "0");
                      setlimitAndOffset({
                        offset: 0,
                        limit: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value={5}>5 rows</option>
                    <option value={10}>10 rows</option>
                    <option value={15}>15 rows</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </form>
      </FormProvider>
      {/* for conformation  */}
      <Modal
        handleConform={handleDelete}
        modalText={"Are you Sure , you want to delete ?"}
        isFor={"warning"}
      />
      {action !== "search" && (
        <div className="flex justify-end">
          <button
            className="flex items-center space-x-2  text-primary "
            onClick={(e) => {
              e.preventDefault();
              setaction("search");
              sessionStorage.setItem("action", "search");
            }}
          >
            <span>return to top</span> <MdClose className="text-lg" />
          </button>
        </div>
      )}
      {action === "new" && <CreateUser viewCreatedData={HandleNewData} />}
      {action === "edit" && (
        <UpdateUser userId={ActionUserid} viewUpdatedData={HandleNewData} />
      )}
    </div>
  );
}
