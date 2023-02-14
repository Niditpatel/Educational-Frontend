import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CreateClass } from "./CreateClass";
import { UpdateClass } from "./UpdateClass";
import {
  AsyncMultiSingleSelect,
  SingleSelect,
} from "../../common/Fields/SelectField";
import { useEffect, useState } from "react";

import { GetInstitutes as GetInstitutesService } from "../../../GetDataService";
import {
  Get as GetDataService,
  Delete as DeleteDataService,
} from "../../../CurdService";

import Table from "../../common/Table/Table";
import ReturnToTop from "../../common/ReturnToTop/ReturnToTop";
import ShowDataQuery from "../../common/Table/ShowdataQuery/ShowDataQuery";
import Modal from "../../common/Modal/Modal";
import { useOutletContext } from "react-router-dom";
import Pagination from "../../common/Pagination/Pagination";
import DisplayRows from "../../common/Table/DisplayRows/DisplayRows";

export default function Class() {
  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);
  const [Classes, setClasses] = useState([]);

  const [boards, setboards] = useState([]);
  const [stages, setstages] = useState([]);

  const [Count, setCount] = useState<any>();
  const [TotalData, setTotalData] = useState<any>();

  const [DeleteClass, setDeleteClass] = useState<any>({});
  const [DeleteClassRespone, setDeleteClassRespone] = useState("");

  const [ActionClassid, setActionClassid] = useState("");
  const [action, setaction] = useState("search");

  const [limitAndOffset, setlimitAndOffset] = useState({
    limit: 5,
    offset: 1,
  });

  const [sortData, setsortData] = useState({ order: 1, sort_by: "" });

  const { handleLoading } = useOutletContext<any>();

  const methods = useForm({
    mode: "onChange",
    //  resolver: yupResolver(SearchInstituteModelSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // for search institutes
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

  useEffect(() => {
    const token = sessionStorage.getItem("Access");
    GetDataService("class/board", token, {}).then((res: any) => {
      setboards(
        res.map((item: any) => {
          return { label: item, value: item };
        })
      );
    });
    GetDataService("class/stage", token, {}).then((res: any) => {
      setstages(
        res.map((item: any) => {
          return { label: item, value: item };
        })
      );
    });
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("Access");
    GetDataService("class/", token, {}).then((res: any) => {
      if (res.success === 1) {
        console.log(res, "res");
        setClasses(res.data);
        setTotalData(res.count);
        setCount(Math.ceil(parseInt(res.count) / 5));
      }
    });
  }, []);

  // for edit class
  const handleClassEdit = (data: any) => {
    setActionClassid(data);
    setaction("edit");
  };

  // conformation for delete
  const handleConfirmationForClassDelete = (data: any) => {
    setDeleteClass(data);
    document.getElementById("DeleteClassModal")?.click();
  };

  // for delete class
  function handleDelete() {
    handleLoading(true);
    const token = sessionStorage.getItem("Access");
    DeleteDataService("user/", token, DeleteClass._id).then((res: any) => {
      handleLoading(false);
      setDeleteClassRespone(res.message);
    });
  }

  // handle return to top
  const handleReturnToTop = () => {
    setaction("search");
    sessionStorage.setItem("Classaction", "search");
  };

  // handle Display Rows
  const handleDisplayRows = (data: any) => {
    sessionStorage.setItem("Classlimit", data);
    methods.setValue("limit", parseInt(data));
    methods.setValue("offset", 1);
    sessionStorage.setItem("Classoffset", "1");
    setlimitAndOffset({
      offset: 1,
      limit: parseInt(data),
    });
  };

  // on page up
  const handlePageUp = (data: any) => {
    const offset = limitAndOffset.offset;
    if (offset < parseInt(Count)) {
      methods.setValue("offset", offset + 1);
      sessionStorage.setItem("Classoffset", (offset + 1).toString());
      setlimitAndOffset({
        ...limitAndOffset,
        offset: offset + 1,
      });
    }
  };

  // on page down
  const handlePageDown = (data: any) => {
    const offset = methods.getValues("offset");
    if (offset > 1) {
      methods.setValue("offset", offset - 1);
      sessionStorage.setItem("Classoffset", (offset - 1).toString());
      setlimitAndOffset({
        ...limitAndOffset,
        offset: offset - 1,
      });
    }
  };

  // on page jump
  const handlePageJump = (data: any) => {
    const page = parseInt(data);
    if (data.length > 0 && page >= 1 && page !== limitAndOffset.offset) {
      methods.setValue("offset", page);
      setlimitAndOffset({
        ...limitAndOffset,
        offset: page,
      });
      sessionStorage.setItem("Classoffset", data);
    }
  };

  // handle data sorting
  const handleSorting = (data: any) => {
    setsortData({
      sort_by: data.sort_by,
      order: data.order,
    });
  };

  return (
    <div className="container px-2 text-primary">
      <div className="capitalize text-lg">Classes</div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className=" mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div className="w-full pr-4">
              <label
                className="capitalize"
                id="InstituteSearchLabel"
                data-tooltip-content="Search The Name, Territory, Level And Type Here.... "
              >
                search
              </label>
              <input
                type="text"
                className="border rounded primary-placeholder w-full p-4  focus:outline-none"
                placeholder="Search..."
                {...methods.register("query")}
              />
            </div>
            <div>
              <label className="capitalize">Institution</label>
              <AsyncMultiSingleSelect
                fieldname="institution"
                placeholder="Select Institution"
                loadOptions={selectInstitute}
                defaultOptions={CahcheInstitute}
              />
            </div>
            <div>
              <label htmlFor="">Exam Board</label>
              <SingleSelect
                fieldname="examBoard"
                placeholder="Select Exam Boards"
                options={boards}
              />
            </div>
            <div>
              <label htmlFor="">Key Stages</label>
              <SingleSelect
                fieldname="keyStage"
                placeholder="Select Key Stages"
                options={stages}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between  mt-5 md:mt-3">
            <div className="flex space-x-8">
              <button
                type="submit"
                className="border border-primary w-32 text-center bg-primary text-white  py-1  capitalize hover:bg-white hover:text-primary "
              >
                search
              </button>
              <button
                id="ClassSearchReset"
                className="border border-primary w-32 text-center bg-primary text-white py-1  capitalize hover:bg-white hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  methods.reset();
                }}
              >
                reset
              </button>
            </div>
            <div>
              <button
                className="underline capitalize"
                onClick={(e) => {
                  e.preventDefault();
                  setaction("new");
                  sessionStorage.setItem("Classaction", "new");
                }}
              >
                &#43; create class
              </button>
            </div>
          </div>
          <div>
            <div className="conatiner py-1  mt-5">
              {Classes && (
                <>
                  {Classes.length > 0 && (
                    <Table
                      data={Classes}
                      isFor={"Class"}
                      handleEdit={handleClassEdit}
                      handleDelete={handleConfirmationForClassDelete}
                      handleSort={handleSorting}
                    >
                      <ShowDataQuery TotalData={TotalData} />
                    </Table>
                  )}
                </>
              )}
              {Classes.length === 0 && (
                <>
                  <div className="capitalize w-full  text-center text-3xl mt-10">
                    There is No Data To show
                  </div>
                </>
              )}
            </div>
            {Classes.length !== 0 && (
              <div className="flex my-5 justify-between">
                <Pagination
                  handlePageUp={handlePageUp}
                  handlePageDown={handlePageDown}
                  handlePageJump={handlePageJump}
                  lastPage={Count}
                />
                {/* display rows */}
                <DisplayRows
                  handleChange={handleDisplayRows}
                  TotalData={TotalData}
                />
              </div>
            )}
          </div>
        </form>
      </FormProvider>
      {/* for conformation  */}
      <Modal
        id="DeleteClassModal"
        handleConform={handleDelete}
        modalText={`Are you sure , You want to delete  ${DeleteClass.name} ?`}
        isFor={"warning"}
      />
      {action !== "search" && <ReturnToTop handleReturn={handleReturnToTop} />}
      {action === "new" && <CreateClass stages={stages} boards={boards} />}
      {action === "edit" && (
        <UpdateClass classId={ActionClassid} stages={stages} boards={boards} />
      )}
    </div>
  );
}
