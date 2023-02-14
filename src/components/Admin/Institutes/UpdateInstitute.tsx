import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import TextField from "../../common/Fields/TextField";
import { SingleSelect } from "../../common/Fields/SelectField";
import CheckboxField from "../../common/Fields/CheckboxField";
import { useEffect, useState } from "react";
import {
  Get as GetDataService,
  Update as UpdateDataService,
} from "../../../CurdService";
import { UseDifferentValueCheck } from "../../common/CustomHooks/UseDifferentValueCheck";
import { useOutletContext } from "react-router-dom";
import { CreateInstituteSchema } from "../../../models/CreateInstituteModel";

export default function UpdateInstitute(props: any) {
  const { instituteId, territories, types, levels } = props;

  const [institute, setinstitute] = useState({});

  const [APIerror, setAPIerror] = useState("");
  const [APIsuccess, setAPIsuccess] = useState("");

  const { handleLoading } = useOutletContext<any>();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateInstituteSchema),
  });

  const onSubmit = (data: any) => {
    const checkForUpdate = UseDifferentValueCheck(institute, data);
    if (checkForUpdate) {
      const { territory, level, type, ...restData } = data;
      const token = sessionStorage.getItem("Access");
      UpdateDataService(
        "institute/" + instituteId,
        {
          level: level.value,
          type: type.value,
          territory: territory.value,
          ...restData,
        },
        token,
        {}
      ).then((res: any) => {
        if (res.success === 1) {
          setAPIsuccess(res.message);
          handleLoading(false);
          props.viewUpdatedData(true);
        } else {
          setAPIerror(res.message);
          handleLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("Access");
    GetDataService("institute/" + instituteId, token, {}).then((res: any) => {
      if (res.success === 1) {
        const Data = res.data;
        methods.setValue("name", Data.name);
        methods.setValue("identifier", Data.identifier);
        methods.setValue("addressLine1", Data.addressLine1);
        methods.setValue("addressLine2", Data.addressLine2);
        methods.setValue("city", Data.city);
        methods.setValue("country", Data.country);
        methods.setValue("postcode", Data.postcode);
        methods.setValue("localAuthority", Data.localAuthority);
        methods.setValue("noOfStudents", Data.noOfStudents);
        methods.setValue("homePage", Data.homePage);
        methods.setValue("isGuest", Data.isGuest);
        methods.setValue("territory", {
          label: Data.territory,
          value: Data.territory,
        });
        methods.setValue("level", {
          label: Data.level,
          value: Data.level,
        });
        methods.setValue("type", {
          label: Data.type,
          value: Data.type,
        });
        setinstitute(methods.getValues());
      }
    });
  }, [instituteId]);

  return (
    <div>
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
            <TextField
              fieldname="localAuthority"
              label="Local Authority"
              required={true}
            />
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
              Update Institution
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
