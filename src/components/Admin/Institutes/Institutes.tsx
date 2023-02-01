import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CreateInstitute from "./CreateInstitute";
import UpdateInstitute from "./UpdateInstitute";

import { AsyncMultiSingleSelect } from "../../common/Fields/SelectField";
import { useState } from "react";

import { GetInstitutes as GetInstitutesService } from "../../../GetDataService";

export default function Institutes() {
  const methods = useForm();

  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);

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

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <div className="container px-2 text-primary">
        <div className="capitalize text-lg">institutes</div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className=" mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              <div className="w-full pr-4">
                <label htmlFor="" className="capitalize">
                  search
                </label>
                <input
                  type="text"
                  className="border rounded light1-placeholder w-full p-4  focus:outline-none"
                  placeholder="Search..."
                  {...methods.register("query")}
                />
              </div>
              <div>
                <label className="capitalize">Institution</label>
                <AsyncMultiSingleSelect
                  fieldname="institution"
                  placeholder="Select Institution"
                  loadOptions={selectInstitute}
                  defaultOptions={CahcheInstitute}
                />
              </div>
              <div>
                <label className="capitalize">Territory</label>
                <AsyncMultiSingleSelect
                  fieldname="territory"
                  placeholder="Select Territory"
                />
              </div>
              <div>
                <label className="capitalize">Institution level</label>
                <AsyncMultiSingleSelect
                  fieldname="level"
                  placeholder="Select Level"
                />
              </div>
              <div>
                <label htmlFor=""> Institution Type</label>
                <AsyncMultiSingleSelect
                  fieldname="type"
                  placeholder="Select Type"
                />
              </div>
              <div>
                <label htmlFor="">Guest Institution</label>
                <AsyncMultiSingleSelect
                  fieldname="guest"
                  placeholder="Select..."
                />
              </div>
            </div>
          </form>
        </FormProvider>
        {/* <CreateInstitute /> */}
        {/* <UpdateInstitute /> */}
      </div>
    </>
  );
}
