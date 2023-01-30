import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TextField from "../../common/Fields/TextField";
import {
  AsyncSingleSelect,
  SingleSelect,
} from "../../common/Fields/SelectField";
import CheckboxField from "../../common/Fields/CheckboxField";
import { CreateInstituteSchema } from "../../../models/CreateInstituteModel";

export default function CreateInstitute() {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateInstituteSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
                <TextField fieldname="identifier" label="Indetifier" />
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
                <TextField fieldname="postcode" label="Postcode" />
              </div>
              <div>
                <TextField fieldname="country" label="Country" />
              </div>
              <div>
                <AsyncSingleSelect
                  fieldname="territory"
                  placeholder="Select Territory"
                />
              </div>
              <div>
                <TextField fieldname="localAuthority" label="Local Authority" />
              </div>
              <div>
                <SingleSelect fieldname="level" placeholder="Level" />
              </div>
              <div>
                <SingleSelect fieldname="type" placeholder="Type" />
              </div>
              <div>
                <TextField fieldname="homepage" label="Home Page" />
              </div>
              <div>
                <TextField fieldname="noOfStudents" label="No Of Students" />
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
