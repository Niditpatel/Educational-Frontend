import * as Yup from "yup";

const CreateInstituteSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "minimum 3 charcter is required")
    .max(20, "maximum 20 charcter is allowed"),
  identifier: Yup.string()
    .required("identifier is required")
    .length(14, "enter valid identifier"),
  addressLine1: Yup.string().required("Address is required"),
  addressLine2: Yup.string().default(null).nullable(),
  city: Yup.string().required("City is required"),
  postcode: Yup.string()
    .required("post code is required")
    .length(6, "enter a valid postcode "),
  country: Yup.string(),
  territory: Yup.object().required("Territory is required").nullable(),
  localAuthority: Yup.string().required("Local Authority is required"),
  homePage: Yup.string().default(null).nullable(),
  level: Yup.object().required("Level is required").nullable(),
  noOfStudents: Yup.string().nullable(),
  type: Yup.object().default(null).nullable(),
  isGuest: Yup.boolean().default(false),
});

export { CreateInstituteSchema };
