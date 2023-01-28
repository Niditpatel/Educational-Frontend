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
          <div className="form-floating w-full">
            <input
              type={togglePasswordVisibility === 1 ? "text" : "password"}
              {...registration}
              {...rest}
              className="form-control  block rounded px-2.5 pb-2.5 pt-5 w-full text-sm border
            transition ease-in-out m-0  focus:outline-none focus:ring-0"
              placeholder={label}
              autoComplete="on"
            />
            <label className="text-primary capitalize">{label}</label>
          </div>
          <label
            className="absolute text-lg right-1 z-1 bottom-3.5 "
            onClick={(e) => {
              e.preventDefault();
              HandlePasswordVisibilityToggle();
            }}
          >
            {togglePasswordVisibility === 0 ? (
              <AiOutlineEye className="w-7 h-6" />
            ) : (
              <AiOutlineEyeInvisible className="w-7 h-6" />
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
