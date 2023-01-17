import * as Yup from "yup";
const SignupDetailSchema = Yup.object().shape({
  title: Yup.object().required("title is required"),
  firstName: Yup.string().required("first name is required").min(2).max(15),
  lastName: Yup.string().required("last name is required").min(2).max(15),
  email: Yup.string()
    .email()
    .required("email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "please enter valid email"),
  institute: Yup.object().required("institute is required"),
  password: Yup.string()
    .required("password is  Required")
    .min(8, "Min 8 Character is Required")
    .max(18, "Max 18 Character is Allowed")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "password should have one number, one capital and one special character"
    ),
  confirmPassword: Yup.string()
    .required("confirmPassword is required")
    .min(8, "Min 8 Character is Required")
    .max(18, "Max 18 Character is Allowed")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "password should have one number, one capital and one special character"
    )
    .oneOf(
      [Yup.ref("password")],
      "confirmPassword doesn't match with the password"
    ),
  terms: Yup.boolean()
    .oneOf(
      [true],
      "you have to aggree with our terms and conditions for ragistration"
    )
    .required(),
  role: Yup.number().default(2),
});

export { SignupDetailSchema };
