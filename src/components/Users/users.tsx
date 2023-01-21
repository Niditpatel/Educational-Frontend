import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AsyncMultiSingleSelect } from "../common/Fields/SelectField";
import { useEffect, useState } from "react";
import { GetInstitutes as GetInstitutesService } from "../../GetDataService";
import {
  Get as GetDataService,
  Delete as DeleteDataService,
} from "../../CurdService";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
const searchUserSchema = Yup.object().shape({
  query: Yup.string(),
  limit: Yup.number().default(5),
  offset: Yup.number().default(0),
  order: Yup.number(),
  sort_by: Yup.string(),
  search_schools: Yup.array().of(Yup.object()),
  role: Yup.array().of(Yup.object()),
});

export default function Users() {
  const [selectRoles, setselectRoles] = useState<any>([]);
  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);
  const [Count, setCount] = useState<any>();
  const [Users, setUsers] = useState<any>([]);
  const [DeleteUser, setDeleteUser] = useState("");
  const [DeleteUserRespone, setDeleteUserRespone] = useState("");
  const { handleLoading } = useOutletContext<any>();
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(searchUserSchema),
  });

  const onSubmit = async (data: any) => {
    const token = sessionStorage.getItem("Access");
    handleLoading(true);
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
    }).then((res: any) => {
      handleLoading(false);
      setUsers([...res.data]);
      setCount(Math.ceil(parseInt(res.count) / 2));
    });
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

  function handleDelete() {
    handleLoading(true);
    const token = sessionStorage.getItem("Access");
    DeleteDataService("user/", token, DeleteUser).then((res) => {
      handleLoading(false);
      setDeleteUserRespone(res.message);
      console.log(res);
    });
  }

  useEffect(() => {
    const token = sessionStorage.getItem("Access");
    const query = sessionStorage.getItem("query");
    const role = sessionStorage.getItem("role");
    const search_schools = sessionStorage.getItem("search_schools");
    if (query !== null && query !== undefined) {
      methods.setValue("query", JSON.parse(query));
    }
    handleLoading(true);
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
      offset: 0,
      limit: 5,
    }).then((res: any) => {
      handleLoading(false);
      setUsers([...res.data]);
      setCount(Math.ceil(parseInt(res.count) / 2));
    });
  }, [DeleteUserRespone]);
  return (
    <>
      <div className="border">
        <div className="border container px-2 text-primary">
          <div className="capitalize text-lg">Users</div>
          <FormProvider {...methods}>
            <form action="" onSubmit={methods.handleSubmit(onSubmit)}>
              <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label htmlFor="" className="capitalize">
                    search
                  </label>
                  <br />
                  <input
                    type="text"
                    id=""
                    className="border rounded light1-placeholder w-full p-4 max-w-[459px] focus:outline-none"
                    placeholder="Search..."
                    {...methods.register("query")}
                  />
                </div>
                <div>
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
              <div className="flex justify-between mt-3">
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
                    }}
                  >
                    &#43; create user
                  </button>
                </div>
              </div>
              <div>
                <div className="flex my-5 justify-between">
                  <div>
                    showing {0} - {Users.length} of {Count} results
                  </div>
                  <div>check box drop down of columns</div>
                </div>
                <div className="w-full">
                  {Users.length > 0 && (
                    <table className="border w-full">
                      <thead>
                        {
                          <tr>
                            <th className="border p-1">id</th>
                            <th className="border p-1">First Name</th>
                            <th className="border p-1">Last Name</th>
                            <th className="border p-1">Email</th>
                            <th className="border p-1">Role</th>
                            <th className="border p-1">Title</th>
                            <th className="border p-1">Institute Id</th>
                            <th className="border p-1">Institute</th>
                            <th className="border p-1">Actions</th>
                          </tr>
                        }
                      </thead>
                      <tbody>
                        {Users.map((item: any) => (
                          <tr key={item.email} className="border">
                            <td className="border p-1">{item._id}</td>
                            <td className="border p-1">{item.firstName}</td>
                            <td className="border p-1">{item.lastName}</td>
                            <td className="border p-1">{item.email}</td>
                            <td className="border p-1">{item.role}</td>
                            <td className="border p-1">{item.title}</td>
                            <td className="border p-1">{item.institute._id}</td>
                            <td className="border p-1">
                              {item.institute.name}
                            </td>
                            <td>
                              <div className="flex ">
                                <button
                                  className="mx-2 "
                                  onClick={(e) => {
                                    e.preventDefault();
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
                </div>
                <div className="flex my-5 justify-between">
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <BsFillCaretLeftFill />
                    </button>
                    <input
                      type="text"
                      value={"0"}
                      className="w-10 mx-3 text-center border-b border-primary focus:outline-none "
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                        if (parseInt(e.target.value) > Count) {
                          e.target.value = Count;
                          console.log(e.target.value);
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
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
                    >
                      <option value={5} selected>
                        5 rows
                      </option>
                      <option value={10}>10 rows</option>
                      <option value={15}>15 rows</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
          {/* for action new  */}
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-toggle="modal"
            data-bs-target="#confirmModal"
          >
            Lanuch Model
          </button>

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
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
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
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-purple-600 text-danger font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
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
        </div>
      </div>
    </>
  );
}
