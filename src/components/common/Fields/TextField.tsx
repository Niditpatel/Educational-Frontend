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
        <div className="relative  w-full">
          <input
            type={type ? type : "text"}
            className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm border appearance-none  focus:outline-none bg-white  peer"
            placeholder={" "}
            {...registration}
            {...rest}
          />
          <label
            className="absolute duration-300 transform -translate-y-4  scale-75 top-4 z-10 origin-[0] left-2.5  peer-placeholder-shown:scale-100
           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
          >
            {label}
          </label>
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
