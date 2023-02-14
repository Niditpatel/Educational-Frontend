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

import { SearchUsersModel } from "../../../models/searchUsersModel";

import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import Table from "../../common/Table/Table";
import Modal from "../../common/Modal/Modal";
import ShowDataQuery from "../../common/Table/ShowdataQuery/ShowDataQuery";
import DisplayRows from "../../common/Table/DisplayRows/DisplayRows";
import ReturnToTop from "../../common/ReturnToTop/ReturnToTop";
import Pagination from "../../common/Pagination/Pagination";
import { Tooltip } from "../../common/Tootip/Tooltip";

export default function Users() {
  const [selectRoles, setselectRoles] = useState<any>([]);
  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);

  const [Count, setCount] = useState<any>();
  const [TotalData, setTotalData] = useState<any>();

  const [Users, setUsers] = useState<[]>([]);

  const [DeleteUser, setDeleteUser] = useState<any>({});
  const [DeleteUserRespone, setDeleteUserRespone] = useState("");

  const [ActionUserid, setActionUserid] = useState("");
  const [action, setaction] = useState("search");

  const [limitAndOffset, setlimitAndOffset] = useState({
    limit: 5,
    offset: 1,
  });

  const [sortData, setsortData] = useState({ order: 1, sort_by: "" });

  const [LoggedUser, setLoggedUser] = useState<any>();

  const { handleLoading } = useOutletContext<any>();

  const [viewNewData, setviewNewData] = useState(false);

  const [Flag, setFlag] = useState(false);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(SearchUsersModel),
    defaultValues: {
      query: null,
      limit: 5,
      offset: 1,
      search_schools: [],
      role: [],
    },
  });

  const GetUsers = useMemo(async () => {
    if (Flag) {
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
          order: sortData.order,
          sort_by: sortData.sort_by,
        });
      if (res.success === 1) {
        setUsers(res.data);
        setTotalData(res.count);
        setCount(Math.ceil(parseInt(res.count) / methods.getValues("limit")));
        handleLoading(false);
      }
      if (res.success === 0) {
        setUsers([]);
        setTotalData(0);
        setCount(0);
        handleLoading(false);
      }
    }
    return true;
  }, [limitAndOffset, DeleteUserRespone, viewNewData, sortData]);

  const onSubmit = async (data: any) => {
    methods.setValue("limit", 5);
    methods.setValue("offset", 1);
    sessionStorage.setItem("limit", "5");
    sessionStorage.setItem("offset", "1");
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
      order: sortData.order,
      sort_by: sortData.sort_by,
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
    const action = sessionStorage.getItem("Useraction");
    setaction(action !== undefined && action !== null ? action : "search");

    const token = sessionStorage.getItem("Access");

    const query = sessionStorage.getItem("query");
    const role = sessionStorage.getItem("role");
    const search_schools = sessionStorage.getItem("search_schools");
    const offset = sessionStorage.getItem("offset");
    const limit = sessionStorage.getItem("limit");
    const order = sessionStorage.getItem("Userorder");
    const sort_by = sessionStorage.getItem("Usersort_by");

    if (query !== null && query !== undefined) {
      methods.setValue("query", JSON.parse(query));
    }
    if (limit !== null && limit !== undefined) {
      methods.setValue("limit", JSON.parse(limit));
    }
    if (offset !== null && offset !== undefined) {
      methods.setValue("offset", JSON.parse(offset));
    }

    if (sort_by !== undefined && sort_by !== null) {
      if (order !== null && order !== undefined) {
        setsortData({ order: parseInt(order), sort_by: sort_by });
      }
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
      offset: offset !== undefined && offset !== null ? offset : 1,
      limit: limit !== undefined && limit !== null ? limit : 5,
      order: order !== undefined && order !== null ? parseInt(order) : 1,
      sort_by: sort_by !== undefined && sort_by !== null ? sort_by : "_id",
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

    return handleLoading(false), setFlag(true);
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
    DeleteDataService("user/", token, DeleteUser._id).then((res) => {
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
  const handleConfirmationForUserDelete = (data: any) => {
    setDeleteUser(data);
    document.getElementById("DeleteUserModal")?.click();
  };

  // handle data sorting
  const handleSorting = (data: any) => {
    setsortData({
      sort_by: data.sort_by,
      order: data.order,
    });
  };

  // handle Display Rows
  const handleDisplayRows = (data: any) => {
    sessionStorage.setItem("limit", data);
    methods.setValue("limit", parseInt(data));
    methods.setValue("offset", 1);
    sessionStorage.setItem("offset", "1");
    setlimitAndOffset({
      offset: 1,
      limit: parseInt(data),
    });
  };

  // handle return to top
  const handleReturnToTop = () => {
    setaction("search");
    sessionStorage.setItem("Useraction", "search");
  };

  // on page up
  const handlePageUp = (data: any) => {
    const offset = limitAndOffset.offset;
    if (offset < parseInt(Count)) {
      methods.setValue("offset", offset + 1);
      sessionStorage.setItem("offset", (offset + 1).toString());
      setlimitAndOffset({
        ...limitAndOffset,
        offset: offset + 1,
      });
    }
  };

  // on page down
  const handlePageDown = (data: any) => {
    const offset = methods.getValues("offset");
    if (offset > 1) {
      methods.setValue("offset", offset - 1);
      sessionStorage.setItem("offset", (offset - 1).toString());
      setlimitAndOffset({
        ...limitAndOffset,
        offset: offset - 1,
      });
    }
  };

  // on page jump
  const handlePageJump = (data: any) => {
    const page = parseInt(data);
    if (data.length > 0 && page >= 1 && page !== limitAndOffset.offset) {
      methods.setValue("offset", page);
      setlimitAndOffset({
        ...limitAndOffset,
        offset: page,
      });
      sessionStorage.setItem("offset", data);
    }
  };

  return (
    <div className=" container px-2 text-primary ">
      <div className="capitalize text-lg">Users</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className=" mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div className="w-full pr-4">
              <label
                id="UserSearchQueryLabel"
                htmlFor=""
                className="capitalize"
                data-tooltip-content="Search First Name, Last Name , Email Or Institute Name Here..."
              >
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
                  sessionStorage.removeItem("Userorder");
                  sessionStorage.removeItem("Usersort_by");
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
                  sessionStorage.setItem("Useraction", "new");
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
                      handleDelete={handleConfirmationForUserDelete}
                      handleSort={handleSorting}
                    >
                      <ShowDataQuery TotalData={TotalData} />
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
                <Pagination
                  handlePageUp={handlePageUp}
                  handlePageDown={handlePageDown}
                  handlePageJump={handlePageJump}
                  lastPage={Count}
                />
                {/* display rows */}
                <DisplayRows
                  handleChange={handleDisplayRows}
                  TotalData={TotalData}
                />
              </div>
            )}
          </div>
        </form>
      </FormProvider>
      {/* for conformation  */}
      <Modal
        id="DeleteUserModal"
        handleConform={handleDelete}
        modalText={`Are you sure , You want to delete  ${DeleteUser.title}.  ${DeleteUser.firstName} ${DeleteUser.lastName} ?`}
        isFor={"warning"}
      />
      {action !== "search" && <ReturnToTop handleReturn={handleReturnToTop} />}
      {action === "new" && (
        <CreateUser viewCreatedData={HandleNewData} roles={selectRoles} />
      )}
      {action === "edit" && (
        <UpdateUser
          userId={ActionUserid}
          viewUpdatedData={HandleNewData}
          roles={selectRoles}
        />
      )}
      {/* Tooltips  */}
      <Tooltip id={"UserSearchQueryLabel"} />
    </div>
  );
}
