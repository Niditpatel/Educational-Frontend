import * as Yup from "yup";

const SearchUsersModel = Yup.object().shape({
  query: Yup.string(),
  limit: Yup.number().default(5),
  offset: Yup.number().default(0),
  search_schools: Yup.array().of(Yup.object()),
  role: Yup.array().of(Yup.object()),
});

export { SearchUsersModel };
