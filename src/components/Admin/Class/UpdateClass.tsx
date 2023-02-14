import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../../common/Fields/TextField";
import {
  AsyncMultiSingleSelect,
  AsyncSingleSelect,
  SingleSelect,
} from "../../common/Fields/SelectField";

export const UpdateClass = (props: any) => {
  const { classId, stages, boards } = props;
  const methods = useForm({
    mode: "onChange",
    // resolver: yupResolver(CreateInstituteSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <TextField fieldname="name" label="Name" required={true} />
              <div className="w-full mt-5">
                <SingleSelect
                  fieldname="keyStage"
                  placeholder="Key Stage"
                  isSearchable={false}
                  options={stages}
                />
              </div>
              <TextField fieldname="yearGroup" label="Year Group" />
              <TextField
                type="number"
                fieldname="noOfStudents"
                label="Number of Students"
              />
              <AsyncSingleSelect
                fieldname="institute"
                placeholder="Institute"
                required={true}
              />
              <div className="w-full mt-5">
                <SingleSelect
                  fieldname="examBoard"
                  placeholder="Exam Board"
                  isSearchable={false}
                  options={boards}
                />
              </div>
              <div className="w-full mt-5">
                <AsyncMultiSingleSelect fieldname="asiignee" />
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="border border-primary px-5 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary"
              >
                Update Class
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
