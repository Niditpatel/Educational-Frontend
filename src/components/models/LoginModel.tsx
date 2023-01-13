import * as Yup from "yup";

const LoginDetailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is  required")
    .email()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "please enter valid email"),
  password: Yup.string()
    .required("Password is Required")
    .min(8, "Min 8 Character is Required")
    .max(18, "Max 18 Character is Allowed")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "password should have one number, one capital and one special character"
    ),
});

export { LoginDetailSchema };
