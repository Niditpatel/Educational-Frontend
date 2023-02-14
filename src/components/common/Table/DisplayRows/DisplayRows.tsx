import { useFormContext } from "react-hook-form";
const DisplayRows = (props: any) => {
  const { handleChange, TotalData } = props;
  const methods = useFormContext();
  return (
    <div>
      <label htmlFor="">Display </label>
      <select
        id=""
        className="bg-white focus:outline-none border-b "
        {...methods.register("limit")}
        onChange={(e) => {
          e.preventDefault();
          handleChange(e.target.value);
        }}
      >
        <option value={5}>5 rows</option>
        <option value={10} disabled={TotalData <= 5}>
          10 rows
        </option>
        <option value={15} disabled={TotalData <= 10}>
          15 rows
        </option>
      </select>
    </div>
  );
};

export default DisplayRows;
