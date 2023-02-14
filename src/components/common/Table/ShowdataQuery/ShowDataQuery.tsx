import { useFormContext } from "react-hook-form";

const ShowDataQuery = (props: any) => {
  const { TotalData } = props;
  const methods = useFormContext();
  return (
    <div>
      showing {(methods.getValues("offset") - 1) * methods.getValues("limit")} -{" "}
      {TotalData < methods.getValues("offset") * methods.getValues("limit")
        ? TotalData
        : methods.getValues("offset") * methods.getValues("limit")}{" "}
      of {TotalData} results
    </div>
  );
};

export default ShowDataQuery;
