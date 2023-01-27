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

import { MdModeEditOutline, MdDelete, MdClose } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

import { SearchUsersModel } from "../../../models/searchUsersModel";

import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import { resizableGrid } from "../../TableColumnResizer/Index";

export default function Users() {
  const [selectRoles, setselectRoles] = useState<any>([]);
  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);

  const [Count, setCount] = useState<any>();
  const [TotalData, setTotalData] = useState<any>();

  const [Users, setUsers] = useState<any>([]);

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

  const [columnVisibility, setcolumnVisibility] = useState({
    col_id: false,
    col_firstname: false,
    col_lastname: false,
    col_email: false,
    col_role: false,
    col_title: false,
    col_institutte_id: false,
    col_institute: false,
    col_action: false,
  });
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
    const res = await GetDataService("user/", token, {
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
      setUsers([...res.data]);
      setTotalData(res.count);
      setCount(Math.ceil(parseInt(res.count) / methods.getValues("limit")));
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
        setUsers([...res.data]);
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

  const HandleNewData = (value: boolean) => {
    if (viewNewData === true) setviewNewData(false);
    else setviewNewData(value);
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
        setUsers([...res.data]);
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

  // table resizing
  useEffect(() => {
    if (Users.length) {
      const table: any = document.getElementsByClassName("table");

      for (var i = 0; i < table.length; i++) {
        resizableGrid(table[i], "userTable");
      }
    }
  }, [Users]);

  return (
    <>
      <div className="">
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
                <div className="flex my-5 items-center justify-between">
                  <div>
                    showing{" "}
                    {methods.getValues("offset") * methods.getValues("limit")} -{" "}
                    {TotalData <
                    (methods.getValues("offset") + 1) *
                      methods.getValues("limit")
                      ? TotalData
                      : (methods.getValues("offset") + 1) *
                        methods.getValues("limit")}{" "}
                    of {TotalData} results
                  </div>
                  <div>
                    <div className="flex justify-center">
                      <div>
                        <div className="dropdown relative">
                          <button
                            className=" dropdown-toggle px-6 py-2 bg-primary text-white font-medium capitalize shadow-md focus:outline-none focus:ring-0 transition duration-150
                             ease-in-out flex items-center whitespace-nowrap"
                            type="button"
                            id="ColumnDropDownForUser"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Column
                          </button>
                          <ul
                            className=" dropdown-menu min-w-max h-32 border overflow-auto absolute hidden bg-white text-base z-20 float-left py-2 list-none
                             text-left   shadow-lg mt-1 m-0 bg-clip-padding "
                            aria-labelledby="ColumnDropDownForUSer"
                          >
                            <li className="px-2 py-0.5 w-full">
                              <div className="dropdown-item flex space-x-2 w-full">
                                <input
                                  type="checkbox"
                                  className="text-primary w-fit border-primary "
                                  onChange={(e) => {
                                    setcolumnVisibility({
                                      ...columnVisibility,
                                      col_id: e.target.checked,
                                    });
                                  }}
                                />
                                <label htmlFor="">id</label>
                              </div>
                            </li>
                            <li className="px-2 py-0.5 w-full">
                              <div className="dropdown-item flex space-x-2 w-full">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    setcolumnVisibility({
                                      ...columnVisibility,
                                      col_firstname: e.target.checked,
                                    });
                                  }}
                                />
                                <label htmlFor="">Fisrt Name</label>
                              </div>
                            </li>
                            <li className="px-2 py-0.5 w-full">
                              <div className="dropdown-item flex space-x-2 w-full">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    setcolumnVisibility({
                                      ...columnVisibility,
                                      col_lastname: e.target.checked,
                                    });
                                  }}
                                />
                                <label htmlFor="">Last Name</label>
                              </div>
                            </li>
                            <li className="px-2 py-0.5 w-full">
                              <div className="dropdown-item flex space-x-2 w-full">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    setcolumnVisibility({
                                      ...columnVisibility,
                                      col_email: e.target.checked,
                                    });
                                  }}
                                />
                                <label htmlFor="">Email</label>
                              </div>
                            </li>
                            <li className="px-2 py-0.5 w-full">
                              <div className="dropdown-item flex space-x-2 w-full">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    setcolumnVisibility({
                                      ...columnVisibility,
                                      col_role: e.target.checked,
                                    });
                                  }}
                                />
                                <label htmlFor="">Role</label>
                              </div>
                            </li>
                            {LoggedUser && (
                              <>
                                {LoggedUser.role === "SuperAdmin" && (
                                  <>
                                    <li className="px-2 py-0.5 w-full">
                                      <div className="dropdown-item flex space-x-2 w-full">
                                        <input
                                          type="checkbox"
                                          onChange={(e) => {
                                            setcolumnVisibility({
                                              ...columnVisibility,
                                              col_institutte_id:
                                                e.target.checked,
                                            });
                                          }}
                                        />
                                        <label htmlFor="">Institute Id</label>
                                      </div>
                                    </li>
                                    <li className="px-2 py-0.5 w-full">
                                      <div className="dropdown-item flex space-x-2 w-full">
                                        <input
                                          type="checkbox"
                                          onChange={(e) => {
                                            setcolumnVisibility({
                                              ...columnVisibility,
                                              col_institute: e.target.checked,
                                            });
                                          }}
                                        />
                                        <label htmlFor="">Institute</label>
                                      </div>
                                    </li>
                                  </>
                                )}
                              </>
                            )}
                            <li className="px-2 py-0.5 w-full">
                              <div className="dropdown-item flex space-x-2 w-full">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    setcolumnVisibility({
                                      ...columnVisibility,
                                      col_title: e.target.checked,
                                    });
                                  }}
                                />
                                <label htmlFor="">Title</label>
                              </div>
                            </li>
                            <li className="px-2 py-0.5 w-full">
                              <div className="dropdown-item flex space-x-2 w-full">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    setcolumnVisibility({
                                      ...columnVisibility,
                                      col_action: e.target.checked,
                                    });
                                  }}
                                />
                                <label htmlFor="">Actions</label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div
                    className="conatiner py-1 overflow-x-auto  overflow-y-hidden "
                    id="userTableParentDiv"
                  >
                    {Users.length > 0 && (
                      <table
                        className=" w-full h-full table box-border "
                        id="userTable"
                      >
                        <thead className="bg-light1/[0.8] ">
                          {
                            <tr>
                              <th
                                className={`border p-1  ${
                                  columnVisibility.col_id === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                Id
                              </th>
                              <th
                                className={`border p-1  ${
                                  columnVisibility.col_firstname === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                First Name
                              </th>
                              <th
                                className={`border p-1  ${
                                  columnVisibility.col_lastname === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                Last Name
                              </th>
                              <th
                                className={`border p-1  ${
                                  columnVisibility.col_email === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                Email
                              </th>
                              <th
                                className={`border p-1 col_role ${
                                  columnVisibility.col_role === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                Role
                              </th>
                              <th
                                className={`border p-1  ${
                                  columnVisibility.col_title === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                Title
                              </th>

                              {LoggedUser.role === "SuperAdmin" && (
                                <>
                                  <th
                                    className={`border p-1  ${
                                      columnVisibility.col_institutte_id ===
                                      true
                                        ? "hidden"
                                        : "show"
                                    }`}
                                  >
                                    Institute Id
                                  </th>
                                  <th
                                    className={`border p-1  ${
                                      columnVisibility.col_institute === true
                                        ? "hidden"
                                        : "show"
                                    }`}
                                  >
                                    Institute
                                  </th>
                                </>
                              )}
                              <th
                                className={`border p-1  ${
                                  columnVisibility.col_action === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                Actions
                              </th>
                            </tr>
                          }
                        </thead>
                        <tbody>
                          {Users.map((item: any) => (
                            <tr
                              key={item.email}
                              className="border capitalize even:bg-light2"
                            >
                              <td
                                className={`border p-1 ${
                                  columnVisibility.col_id === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                {item._id}
                              </td>
                              <td
                                className={`border p-1 ${
                                  columnVisibility.col_firstname === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                {item.firstName}
                              </td>
                              <td
                                className={`border p-1  ${
                                  columnVisibility.col_lastname === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                {item.lastName}
                              </td>
                              <td
                                className={`border p-1   ${
                                  columnVisibility.col_email === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                {item.email}
                              </td>
                              <td
                                className={`border p-1 ${
                                  columnVisibility.col_role === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                {item.role}
                              </td>
                              <td
                                className={`border p-1 ${
                                  columnVisibility.col_title === true
                                    ? "hidden"
                                    : "show"
                                } `}
                              >
                                {item.title}
                              </td>
                              {LoggedUser.role === "SuperAdmin" && (
                                <>
                                  <td
                                    className={`border p-1 ${
                                      columnVisibility.col_institutte_id ===
                                      true
                                        ? "hidden"
                                        : "show"
                                    }`}
                                  >
                                    {item.institute._id}
                                  </td>
                                  <td
                                    className={`border p-1  ${
                                      columnVisibility.col_institute === true
                                        ? "hidden"
                                        : "show"
                                    }`}
                                  >
                                    {item.institute.name}
                                  </td>
                                </>
                              )}
                              <td
                                className={`col_action ${
                                  columnVisibility.col_action === true
                                    ? "hidden"
                                    : "show"
                                }`}
                              >
                                <div className="flex ">
                                  <button
                                    className="mx-2 "
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setActionUserid(item._id);
                                      setaction("edit");
                                      sessionStorage.setItem("action", "edit");
                                      sessionStorage.setItem(
                                        "editUserId",
                                        item._id
                                      );
                                    }}
                                  >
                                    <MdModeEditOutline />
                                  </button>
                                  <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#confirmModal"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setDeleteUser(item._id);
                                    }}
                                  >
                                    <MdDelete />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {Users.length === 0 && (
                      <>
                        <div>There is No Data To show</div>
                      </>
                    )}
                  </div>
                </div>
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
                      type="text"
                      id="offsetForUserManagement"
                      className="w-10 mx-3 text-center border-b border-primary focus:outline-none "
                      {...methods.register("offset")}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
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
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const offset = methods.getValues("offset");
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
              </div>
            </form>
          </FormProvider>
          {/* for conformation  */}
          <div
            className="modal fade fixed top-20 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="confirmModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b  rounded-t-md">
                  <h5
                    className="text-xl font-medium leading-normal "
                    id="exampleModalLabel"
                  >
                    <div className="flex items-center space-x-2 text-danger">
                      <AiOutlineWarning /> <span className=""> Alert</span>
                    </div>
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-secondary border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-primary hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body relative p-4">
                  Are you Sure , you want to delete ?
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t  rounded-b-md">
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5  text-danger font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="inline-block px-6 py-2.5 bg-blue-600  font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
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
      </div>
    </>
  );
}
