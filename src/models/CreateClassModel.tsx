import * as Yup from "yup";

export const CreateClassModel = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .min(3, "minimum 3 charcter is required")
    .max(8, "maximum 8 charcter is allowed"),
  yearGroup: Yup.string().default(null),
  noOfStudents: Yup.string().default(null).nullable(),
  assignee: Yup.array().of(Yup.object()),
  institute: Yup.object().required("Institute is required").nullable(),
  keyStage: Yup.array().of(Yup.object()),
  examBoard: Yup.array().of(Yup.object()),
});
