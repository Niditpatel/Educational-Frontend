import * as Yup from "yup";
const SignupDetailSchema = Yup.object().shape({
  title: Yup.object().required("title is required").nullable(),
  firstName: Yup.string().required("first name is required").min(2).max(15),
  lastName: Yup.string().required("last name is required").min(2).max(15),
  email: Yup.string()
    .email()
    .required("email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "please enter valid email"),
  institute: Yup.object().required("institute is required").nullable(),
  password: Yup.string()
    .required("password is  Required")
    .matches(/.*[0-9].*/, "at least one number is required")
    .matches(/(?=.*[A-Z])/, "at least one capital letter is required")
    .matches(/(?=.*[@$!%*?&])/, "at least one special charcter is required")
    .min(8, "Min 8 Character is Required")
    .max(18, "Max 18 Character is Allowed"),
  confirmPassword: Yup.string()
    .required("confirm Password is required")
    .matches(/.*[0-9].*/, "at least one number is required")
    .matches(/(?=.*[A-Z])/, "at least one capital letter is required")
    .matches(/(?=.*[@$!%*?&])/, "at least one special charcter is required")
    .min(8, "Min 8 Character is Required")
    .max(18, "Max 18 Character is Allowed")
    .oneOf(
      [Yup.ref("password")],
      "confirm Password doesn't match with the password"
    ),
  terms: Yup.boolean()
    .oneOf(
      [true],
      "you have to aggree with our terms and conditions for ragistration"
    )
    .required(),
});

export { SignupDetailSchema };
