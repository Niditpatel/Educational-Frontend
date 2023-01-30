import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import TextField from "../../common/Fields/TextField";

const CreateInstituteSchema = Yup.object().shape({
  name: Yup.string(),
});

export default function UpdateInstitute() {
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
            <TextField fieldname="name" label="Name" />
          </form>
        </FormProvider>
      </div>
    </>
  );
}
