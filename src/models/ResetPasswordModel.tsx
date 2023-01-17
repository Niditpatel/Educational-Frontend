import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("password is  Required")
    .min(8, "Min 10 Character is Required")
    .max(18, "Max 18 Character is Allowed")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "password should have one number, one capital and one special character"
    ),
  confirmPassword: Yup.string()
    .required("confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});
export { ResetPasswordSchema };
