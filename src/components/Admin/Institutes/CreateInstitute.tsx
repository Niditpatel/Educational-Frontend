import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import TextField from "../../common/Fields/TextField";
import { SingleSelect } from "../../common/Fields/SelectField";
import CheckboxField from "../../common/Fields/CheckboxField";

import { CreateInstituteSchema } from "../../../models/CreateInstituteModel";

import { Create as CreateInstituteService } from "../../../CurdService";

export default function CreateInstitute(props: any) {
  const { levels, types, territories } = props;

  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState("");

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateInstituteSchema),
  });
  const { handleLoading } = useOutletContext<any>();

  const onSubmit = (data: any) => {
    setAPIsuccess("");
    setAPIerror("");
    handleLoading(true);
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
      if (res.success === 1) {
        setAPIsuccess(res.message);
        methods.reset();
        handleLoading(false);
        props.viewCreatedData(true);
      } else if (res.success === 0) {
        setAPIerror(res.message);
        handleLoading(false);
      }
    });
  };

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
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <TextField fieldname="name" label="Name" required={true} />
            <TextField
              fieldname="identifier"
              label="Indetifier"
              type="number"
              required={true}
            />
            <TextField
              fieldname="addressLine1"
              label="Address line 1"
              required={true}
            />
            <TextField fieldname="addressLine2" label="Address line 2" />
            <TextField fieldname="city" label="Town / City" required={true} />
            <TextField
              fieldname="postcode"
              label="Postcode"
              type="number"
              required={true}
            />
            <TextField fieldname="country" label="Country" />
            <div className="w-full mt-5">
              <SingleSelect
                fieldname="territory"
                placeholder="Select Territory"
                options={territories}
                isSearchable={false}
                required={true}
              />
            </div>
            <div>
              <TextField
                fieldname="localAuthority"
                label="Local Authority"
                required={true}
              />
            </div>
            <div className="w-full mt-5">
              <SingleSelect
                fieldname="level"
                placeholder="Level"
                options={levels}
                isSearchable={false}
                required={true}
              />
            </div>
            <div className="w-full mt-5">
              <SingleSelect
                fieldname="type"
                placeholder="Type"
                options={types}
                isSearchable={false}
              />
            </div>
            <TextField fieldname="homePage" label="Home Page" />
            <TextField
              fieldname="noOfStudents"
              label="No Of Students"
              type="number"
            />
          </div>
          <CheckboxField fieldname="isGuest">
            <label>Guset Institution</label>
          </CheckboxField>
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
    </>
  );
}
