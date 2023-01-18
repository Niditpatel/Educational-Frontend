import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";
import { Controller, useFormContext, useController } from "react-hook-form";
import { forwardRef } from "react";
import { BsArrowRight } from "react-icons/bs";

const Control = ({ children, ...props }: any) => (
  <components.Control {...props}>
    Title <BsArrowRight className="ml-2" /> {children}
  </components.Control>
);

const selectStyles = {
  menu: (provided: any) => ({
    ...provided,
    zIndex: 50,
  }),
  control: (baseStylese: any) => ({
    ...baseStylese,
    padding: "10px 12px",
    color: "#274472",
    outline: 0,
    border: "1 !important",
    borderColor: "#274472",
    boxShadow: "0 !important",
    "&:hover": {
      borderColor: "#274472",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#274472",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#274472",
  }),
};

const SingleSelect = forwardRef(
  ({ fieldname, required, options, isSearchable, ...rest }: any, ref) => {
    const methods = useFormContext();
    const registration = methods.register(fieldname);
    const { fieldState } = useController({ name: fieldname });
    let error = fieldState?.error;
    return (
      <>
        <div className="flex mt-5 w-full space-x-2">
          <div className="w-full">
            <Controller
              control={methods.control}
              {...registration}
              render={({ field }) => (
                <Select
                  isSearchable={isSearchable}
                  {...field}
                  options={options}
                  styles={selectStyles}
                  components={{ Control }}
                  {...rest}
                />
              )}
            />
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
);

export function AsyncSingleSelect({
  fieldname,
  options,
  required,
  loadOptions,
  instituteDefaultOptions,
  ...rest
}: any) {
  const methods = useFormContext();
  const registration = methods.register(fieldname);
  const { fieldState } = useController({ name: fieldname });
  let error = fieldState?.error;
  const fieldsValue = methods.getValues(fieldname);
  const defaultOptions = fieldsValue !== null ? instituteDefaultOptions : [];
  return (
    <>
      <div className="flex mt-5 w-full space-x-2">
        <div className="w-full">
          <Controller
            control={methods.control}
            {...registration}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                cacheOptions
                defaultOptions={defaultOptions}
                isClearable
                loadOptions={loadOptions}
                getOptionValue={(option: any) => option.value}
                getOptionLabel={(option: any) => option.label}
                styles={selectStyles}
                {...rest}
                noOptionsMessage={({ inputValue }) =>
                  !inputValue
                    ? "Start Typing to Search Institutes"
                    : inputValue.length > 2
                    ? "No Institute Are Found Matching This Value"
                    : "Type At Least Three Character to View Result"
                }
              />
            )}
          />
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

export function AsyncMultiSingleSelect({
  fieldname,
  options,
  required,
  loadOptions,
  ...rest
}: any) {
  const methods = useFormContext();
  const registration = methods.register(fieldname);
  const { fieldState } = useController({ name: fieldname });
  let error = fieldState?.error;
  const { placeholder, ...restSelectStyles } = selectStyles;
  return (
    <>
      <div className="flex w-full space-x-2">
        <div className="w-full">
          <Controller
            control={methods.control}
            {...registration}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                isMulti
                loadOptions={loadOptions}
                getOptionValue={(option: any) => option.value}
                getOptionLabel={(option: any) => option.label}
                styles={{
                  placeholder: (provided: any) => ({
                    ...provided,
                    color: "#5885AF",
                  }),
                  ...restSelectStyles,
                }}
                {...rest}
              />
            )}
          />
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

export { SingleSelect };
