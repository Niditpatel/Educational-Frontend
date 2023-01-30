import * as Yup from "yup";

const CreateUserModelSchema = Yup.object().shape({
  role: Yup.object().required("role is required").nullable(),
  title: Yup.object().required("Title is required").nullable(),
  firstName: Yup.string().required("first name is required").min(2).max(15),
  lastName: Yup.string().required("last name is required").min(2).max(15),
  email: Yup.string()
    .email()
    .required("email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "please enter valid email"),
  institute: Yup.object().required("Institute is Required").nullable(),
});

export { CreateUserModelSchema };
