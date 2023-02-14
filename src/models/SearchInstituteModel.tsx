import * as Yup from "yup";

const SearchInstituteModelSchema = Yup.object().shape({
  query: Yup.string().nullable(),
  limit: Yup.number().default(5),
  offset: Yup.number().default(0),
  institution: Yup.array().of(Yup.object()),
  territory: Yup.array().of(Yup.object()),
  level: Yup.array().of(Yup.object()),
  type: Yup.array().of(Yup.object()),
  guest: Yup.object().nullable(),
});

export { SearchInstituteModelSchema };
