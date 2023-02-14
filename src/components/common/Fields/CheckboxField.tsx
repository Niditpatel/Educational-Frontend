import { useFormContext, useController } from "react-hook-form";

export default function CheckboxField(props: any) {
  const methods = useFormContext();
  const registration = methods.register(props.fieldname);
  const { fieldState } = useController({ name: props.fieldname });
  let error = fieldState?.error;

  return (
    <div className="my-3">
      <div className="flex">
        <input type="checkbox" {...registration} className="h-4 w-4  mt-1" />
        <span className=" pl-3">{props.children}</span>
      </div>
      <div className="text-sm text-danger">{error?.message}</div>
    </div>
  );
}
