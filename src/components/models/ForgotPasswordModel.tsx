import * as Yup from "yup";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("email is  required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email is not valid"),
});
export { ForgotPasswordSchema };
