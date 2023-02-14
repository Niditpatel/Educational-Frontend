import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../../common/Fields/TextField";
import {
  AsyncMultiSingleSelect,
  AsyncSingleSelect,
  SingleSelect,
} from "../../common/Fields/SelectField";

import { CreateClassModel } from "../../../models/CreateClassModel";
import { useState } from "react";

import { Create as CreateClassService } from "../../../CurdService";
import { GetInstitutes as GetInstitutesService } from "../../../GetDataService";
import { useOutletContext } from "react-router-dom";

export const CreateClass = (props: any) => {
  const { stages, boards } = props;
  const [APIerror, setAPIerror] = useState("");
  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);
  const [APIsuccess, setAPIsuccess] = useState("");

  const { handleLoading } = useOutletContext<any>();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateClassModel),
  });

  const selectInstitute = async (inputValue: string) => {
    if (inputValue.length > 2) {
      const res = await GetInstitutesService(inputValue);
      const institutes = res.map((val: any) => {
        return { label: val.name.toUpperCase(), value: val._id };
      });
      setCahcheInstitute([...institutes]);
      return institutes;
    }
  };

  const SelectAssigne = async (inputValue: string) => {
    // if (inputValue.length > 2) {
    //   const res = await (inputValue);
    //   const institutes = res.map((val: any) => {
    //     return { label: val.name.toUpperCase(), value: val._id };
    //   });
    //   setCahcheInstitute([...institutes]);
    //   return institutes;
    // }
  };

  const onSubmit = (data: any) => {
    setAPIsuccess("");
    setAPIerror("");
    handleLoading(true);
    const token = sessionStorage.getItem("Access");

    const { keyStage, institute, assignee, ...restData } = data;

    CreateClassService(
      "class/",
      {
        keyStage: keyStage.value,
        institute: institute.value,
        assignee: assignee.value,
        ...restData,
      },
      {}
    ).then((res: any) => {
      if (res.success === 0) {
        handleLoading(false);
        setAPIerror(res.message);
      } else {
        setAPIsuccess(res.message);
        methods.reset();
        handleLoading(false);
      }
    });
  };
  return (
    <>
      <div>
        <div className="flex justify-center">
          {APIerror.length > 0 && (
            <div className="bg-warning rounded p-2">{APIerror}</div>
          )}
          {APIsuccess.length > 0 && (
            <div className="bg-success p-2 rounded">{APIsuccess}</div>
          )}
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <TextField fieldname="name" label="Name" required={true} />
              <div className="w-full mt-5">
                <SingleSelect
                  fieldname="keyStage"
                  placeholder="Key Stage"
                  isSearchable={false}
                  options={stages}
                />
              </div>
              <TextField fieldname="yearGroup" label="Year Group" />
              <TextField
                type="number"
                fieldname="noOfStudents"
                label="Number of Students"
              />
              <AsyncSingleSelect
                fieldname="institute"
                placeholder="Institute"
                loadOptions={selectInstitute}
                instituteDefaultOptions={CahcheInstitute}
                required={true}
              />
              <div className="w-full mt-5">
                <SingleSelect
                  fieldname="examBoard"
                  isSearchable={false}
                  placeholder="Exam Board"
                  options={boards}
                />
              </div>
              <div className="w-full mt-5">
                <AsyncMultiSingleSelect
                  fieldname="assignee"
                  placeholder="Assignee"
                  loadOptions={SelectAssigne}
                />
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="border border-primary px-5 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary"
              >
                Create Class
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
