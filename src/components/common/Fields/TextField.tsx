import { useFormContext, useController } from "react-hook-form";
export default function TextField({
  fieldname,
  required,
  type,
  label,
  ...rest
}: any) {
  const methods = useFormContext();
  const registration = methods.register(fieldname);
  const { fieldState } = useController({ name: fieldname });
  let error = fieldState?.error;
  return (
    <>
      <div className="flex mt-5 w-full space-x-2">
        <div className="form-floating  w-full">
          <input
            type={type ? type : "text"}
            {...registration}
            {...rest}
            className="form-control  block rounded px-2.5 pb-2.5 pt-5 w-full text-sm border
            transition ease-in-out m-0  focus:outline-none focus:ring-0"
            placeholder={label}
          />
          <label className="text-primary">{label}</label>
        </div>
        <div
          className={`w-2 ${
            error?.type !== "required" ? "text-primary" : "text-danger"
          }`}
        >
          {required && <span>*</span>}
        </div>
      </div>
      <div className="text-sm text-danger capitalize">{error?.message}</div>
    </>
  );
}
