import { useState } from "react";
import { useFormContext, useController } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function PasswordField({ fieldname, label, ...rest }: any) {
  const methods = useFormContext();
  const registration = methods.register(fieldname);
  const { fieldState } = useController({ name: fieldname });
  let error = fieldState?.error;

  const [togglePasswordVisibility, settogglePasswordVisibility] = useState(0);

  function HandlePasswordVisibilityToggle() {
    if (togglePasswordVisibility === 0) settogglePasswordVisibility(1);
    else settogglePasswordVisibility(0);
  }

  return (
    <>
      <div className="flex mt-5 space-x-2">
        <div className="relative w-full">
          <input
            type={togglePasswordVisibility === 1 ? "text" : "password"}
            className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm border appearance-none  focus:outline-none focus:ring-0  peer"
            placeholder=" "
            autoComplete="on"
            {...registration}
            {...rest}
          />
          <label className="absolute capitalize  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
            {label}
          </label>
          <label
            className="absolute text-lg right-1 z-1 bottom-2"
            onClick={(e) => {
              e.preventDefault();
              HandlePasswordVisibilityToggle();
            }}
          >
            {togglePasswordVisibility === 0 ? (
              <AiOutlineEye className="w-6 h-5" />
            ) : (
              <AiOutlineEyeInvisible className="w-6 h-5" />
            )}
          </label>
        </div>
        <div
          className={`w-2 ${
            error?.type !== "required" ? "text-primary" : "text-danger"
          }`}
        >
          *
        </div>
      </div>
      <div className="text-sm text-danger capitalize">{error?.message}</div>
    </>
  );
}
