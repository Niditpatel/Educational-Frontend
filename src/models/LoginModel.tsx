import * as Yup from "yup";

const LoginDetailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is  required")
    .email()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "please enter valid email"),
  password: Yup.string().required("Password is Required"),
});

export { LoginDetailSchema };
