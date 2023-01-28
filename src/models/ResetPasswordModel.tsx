import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("password is  Required")
    .matches(/.*[0-9].*/, "at least one number is required")
    .matches(/(?=.*[A-Z])/, "at least one capital letter is required")
    .matches(/(?=.*[@$!%*?&])/, "at least one special charcter is required")
    .min(8, "Min 8 Character is Required")
    .max(18, "Max 18 Character is Allowed"),
  confirmPassword: Yup.string()
    .required("confirm password is required")
    .matches(/.*[0-9].*/, "at least one number is required")
    .matches(/(?=.*[A-Z])/, "at least one capital letter is required")
    .matches(/(?=.*[@$!%*?&])/, "at least one special charcter is required")
    .min(8, "Min 8 Character is Required")
    .max(18, "Max 18 Character is Allowed")
    .oneOf(
      [Yup.ref("password")],
      "confirm Password doesn't match with the password"
    ),
});
export { ResetPasswordSchema };
