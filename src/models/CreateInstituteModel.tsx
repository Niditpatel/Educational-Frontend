import * as Yup from "yup";

const CreateInstituteSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "minimum 3 charcter is required")
    .max(20, "maximum 20 charcter is allowed"),
  identifier: Yup.string().required("identifier is required"),
  addressLine1: Yup.string().required("Address is required"),
  addressLine2: Yup.string(),
  city: Yup.string().required("City is required"),
  postcode: Yup.string()
    .required("post code is required")
    .length(6)
    .matches(/[0-9]{6}/, "invalid post code"),
  country: Yup.string(),
  territory: Yup.string().required("Territory is required"),
  localAuthority: Yup.string().required("Local Authority is required"),
  homePage: Yup.string(),
  level: Yup.string().required("Level is required"),
  noOfStudents: Yup.number().nullable(),
  type: Yup.string().default(null).nullable(),
  isGuest: Yup.boolean().default(false),
});

export { CreateInstituteSchema };
