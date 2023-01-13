import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AsyncMultiSingleSelect } from "../common/Fields/SelectField";

const searchUserSchema = Yup.object().shape({
  query: Yup.string(),
  role: Yup.number(),
  limit: Yup.number(),
  offset: Yup.number(),
  order: Yup.number(),
  sort_by: Yup.string(),
  search_schools: Yup.array().of(Yup.object()),
});

export default function Users() {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(searchUserSchema),
  });
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <>
      <div className="border">
        <div className="border container px-2 text-primary">
          <div className="capitalize text-lg">Users</div>
          <FormProvider {...methods}>
            <form action="">
              <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label htmlFor="" className="capitalize">
                    search
                  </label>
                  <br />
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border rounded light1-placeholder w-full p-3 max-w-[420px]"
                    placeholder="Search..."
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
                  />
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex space-x-8">
                  <button className="border border-primary w-32 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary ">
                    search
                  </button>
                  <button className="border border-primary w-32 text-center bg-primary text-white py-1  capitalize hover:bg-white hover:text-primary">
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
                <div>
                  <div>query</div>
                  <div>check box drop down of columns</div>
                </div>
                <div>table data bind from apis</div>
                <div>
                  <div>pagination </div>
                  <div>select no fo rows</div>
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
