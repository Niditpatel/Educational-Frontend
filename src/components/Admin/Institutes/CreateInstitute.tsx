import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import TextField from "../../common/Fields/TextField";
import { SingleSelect } from "../../common/Fields/SelectField";
import CheckboxField from "../../common/Fields/CheckboxField";

import { CreateInstituteSchema } from "../../../models/CreateInstituteModel";

import {
  Get as GetDataService,
  Create as CreateInstituteService,
} from "../../../CurdService";

export default function CreateInstitute() {
  const [levels, setlevels] = useState<any>([]);
  const [types, settypes] = useState<any>([]);
  const [territories, setterritories] = useState<any>([]);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateInstituteSchema),
  });
  const { handleLoading } = useOutletContext<any>();

  const onSubmit = (data: any) => {
    const { type, level, territory, ...restData } = data;
    CreateInstituteService(
      "institute/",
      {
        type: data.type.value,
        level: data.level.value,
        territory: data.territory.value,
        ...restData,
      },
      {}
    ).then((res: any) => {
      console.log(res, "res");
    });
  };

  useEffect((): any => {
    const token = sessionStorage.getItem("Access");
    handleLoading(true);
    // types
    GetDataService("institute/type", token, {}).then((data: any) => {
      const types = data.map((val: string) => {
        return { value: val, label: val };
      });
      settypes(types);
    });
    // levels
    GetDataService("institute/level", token, {}).then((data: any) => {
      const levels = data.map((val: string) => {
        return { value: val, label: val };
      });
      setlevels(levels);
    });
    // territories
    GetDataService("institute/territory", token, {}).then((data: any) => {
      const territories = data.map((val: string) => {
        return { value: val, label: val };
      });
      setterritories(territories);
    });
    return handleLoading(false);
  }, []);

  return (
    <>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2">
              <div className="">
                <TextField fieldname="name" label="Name" />
              </div>
              <div>
                <TextField
                  fieldname="identifier"
                  label="Indetifier"
                  type="number"
                />
              </div>
              <div>
                <TextField fieldname="addressLine1" label="Address line 1" />
              </div>
              <div>
                <TextField fieldname="addressLine2" label="Address line 2" />
              </div>
              <div>
                <TextField fieldname="city" label="Town / City" />
              </div>
              <div>
                <TextField
                  fieldname="postcode"
                  label="Postcode"
                  type="number"
                />
              </div>
              <div>
                <TextField fieldname="country" label="Country" />
              </div>
              <div>
                <SingleSelect
                  fieldname="territory"
                  placeholder="Select Territory"
                  options={territories}
                  isSearchable={false}
                  required={true}
                />
              </div>
              <div>
                <TextField fieldname="localAuthority" label="Local Authority" />
              </div>
              <div>
                <SingleSelect
                  fieldname="level"
                  placeholder="Level"
                  options={levels}
                  isSearchable={false}
                  required={true}
                />
              </div>
              <div>
                <SingleSelect
                  fieldname="type"
                  placeholder="Type"
                  options={types}
                  isSearchable={false}
                />
              </div>
              <div>
                <TextField fieldname="homePage" label="Home Page" />
              </div>
              <div>
                <TextField
                  fieldname="noOfStudents"
                  label="No Of Students"
                  type="number"
                />
              </div>
            </div>
            <div>
              <CheckboxField fieldname="isGuest">
                <label>Guset Institution</label>
              </CheckboxField>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="border border-primary px-5 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary "
              >
                Create Institution
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
