import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Controller, useFormContext, useController } from "react-hook-form";
import { forwardRef, useEffect } from "react";

const label = (label: any) => ({
  display: "flex",
  flexDirection: "column",

  ":before": {
    content: label,
    textTransform: "capitalize",
    fontSize: "15px",
    opacity: "0.7",
  },
});

const selectStyles = {
  menu: (provided: any) => ({
    ...provided,
    zIndex: 50,
  }),
  control: (baseStylese: any) => ({
    ...baseStylese,
    padding: "10px 0px",
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
  (
    { fieldname, required, options, isSearchable, isMulti, ...rest }: any,
    ref
  ) => {
    const methods = useFormContext();
    const registration = methods.register(fieldname);
    const { fieldState } = useController({ name: fieldname });
    let error = fieldState?.error;

    var floatingLabel = "'" + fieldname + "'";

    const { singleValue, ...restStyle } = selectStyles;

    return (
      <>
        <div className="flex  w-full space-x-2">
          <div className="w-full">
            {/* <div className="capitalize">{fieldname} : </div> */}
            <Controller
              control={methods.control}
              {...registration}
              render={({ field }) => (
                <Select
                  isSearchable={isSearchable}
                  {...field}
                  options={options}
                  isMulti={
                    isMulti !== undefined && isMulti === true ? true : false
                  }
                  isClearable
                  styles={{
                    singleValue: (provided: any) => ({
                      ...provided,
                      ...label(floatingLabel),
                      color: "#274472",
                      fontSize: "15px",
                    }),
                    ...restStyle,
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
);

export function AsyncSingleSelect({
  fieldname,
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

  var floatingLabel = "'" + fieldname + "'";

  const { singleValue, ...restStyle } = selectStyles;

  return (
    <div>
      <div className="flex mt-5 w-full space-x-2">
        <div className="w-full">
          {/* <div className="capitalize">{fieldname} : </div> */}
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
                styles={{
                  singleValue: (provided: any) => ({
                    ...provided,
                    ...label(floatingLabel),
                    color: "#274472",
                    fontSize: "15px",
                  }),
                  ...restStyle,
                }}
                {...rest}
                noOptionsMessage={({ inputValue }) =>
                  !inputValue
                    ? "Start Typing to View Results"
                    : inputValue.length > 2
                    ? "No Result Are Found Matching This Value"
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
    </div>
  );
}

export function AsyncMultiSingleSelect({
  fieldname,
  required,
  loadOptions,
  defaultOptions,
  isSearchable,
  ...rest
}: any) {
  const methods = useFormContext();
  const registration = methods.register(fieldname);
  const { fieldState } = useController({ name: fieldname });
  let error = fieldState?.error;

  useEffect(() => {
    const fieldvalue = sessionStorage.getItem(fieldname);
    if (fieldvalue !== undefined && fieldvalue !== null) {
      if (fieldvalue?.length > 0) {
        methods.setValue(fieldname, JSON.parse(fieldvalue));
      }
    }
  }, []);

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
                isClearable
                cacheOptions
                isSearchable={isSearchable}
                defaultOptions={defaultOptions}
                loadOptions={loadOptions}
                getOptionValue={(option: any) => option.value}
                getOptionLabel={(option: any) => option.label}
                styles={selectStyles}
                noOptionsMessage={({ inputValue }) =>
                  !inputValue
                    ? "Start Typing to View Results"
                    : inputValue.length > 2
                    ? "No Result Are Found Matching This Value"
                    : "Type At Least Three Character to View Result"
                }
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
