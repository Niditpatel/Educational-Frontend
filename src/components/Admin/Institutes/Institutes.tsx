import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../../common/Fields/TextField";
import CreateInstitute from "./CreateInstitute";
import UpdateInstitute from "./UpdateInstitute";

export default function Institutes() {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <div className="container px-2 text-primary">
        <div className="capitalize text-lg">institutes</div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="w-full pr-4">
              <label>Search</label>
              <br />
              {/* <TextField fieldname="query" /> */}
            </div>
          </form>
        </FormProvider>
        <CreateInstitute />
        {/* <UpdateInstitute /> */}
      </div>
    </>
  );
}
