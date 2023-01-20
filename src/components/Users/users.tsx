import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AsyncMultiSingleSelect } from "../common/Fields/SelectField";
import { useEffect, useState } from "react";
import { GetInstitutes as GetInstitutesService } from "../../GetDataService";
import { Get as GetDataService } from "../../CurdService";

const searchUserSchema = Yup.object().shape({
  query: Yup.string(),
  limit: Yup.number(),
  offset: Yup.number(),
  order: Yup.number(),
  sort_by: Yup.string(),
  search_schools: Yup.array().of(Yup.object()),
  role: Yup.array().of(Yup.object()),
});

export default function Users() {
  const [selectRoles, setselectRoles] = useState<any>([]);
  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);
  const [Count, setCount] = useState("");
  const [Users, setUsers] = useState<any>([]);
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(searchUserSchema),
  });

  const onSubmit = async (data: any) => {
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
      console.log(res);
      setUsers([...res.data]);
      setCount(res.count);
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

  useEffect(() => {
    const token = sessionStorage.getItem("Access");
    const query = sessionStorage.getItem("query");
    const role = sessionStorage.getItem("role");
    const search_schools = sessionStorage.getItem("search_schools");
    if (query !== null && query !== undefined) {
      methods.setValue("query", JSON.parse(query));
    }
    GetDataService("roles", token, {}).then((res) => {
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
    }).then((res: any) => {
      setUsers([...res.data]);
      setCount(res.count);
    });
  }, []);
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
                  <button className="underline capitalize">
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="flex my-5 justify-between">
                  <div className="w-16 border flex overflow-auto">
                    {Math.ceil(parseInt(Count) / 2)}
                    {new Array(3).fill(1).map((item, index) => (
                      <button className="mx-3" key={index}>
                        {index}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="">Display </label>
                    <select
                      name=""
                      id=""
                      className="bg-white focus:outline-none border-b "
                    >
                      <option value="1">1 rows</option>
                      <option value="2">2 rows</option>
                      <option value="3">3 rows</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
          {/* for action new  */}
        </div>
      </div>
    </>
  );
}
