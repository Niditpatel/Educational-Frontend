import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CreateInstitute from "./CreateInstitute";
import UpdateInstitute from "./UpdateInstitute";
import ShowDataQuery from "../../common/Table/ShowdataQuery/ShowDataQuery";

import {
  AsyncMultiSingleSelect,
  SingleSelect,
} from "../../common/Fields/SelectField";
import { useEffect, useMemo, useState } from "react";

import { GetInstitutes as GetInstitutesService } from "../../../GetDataService";
import {
  Get as GetDataService,
  Delete as DeleteDataService,
} from "../../../CurdService";
import Table from "../../common/Table/Table";
import Modal from "../../common/Modal/Modal";
import { useOutletContext } from "react-router-dom";

import { SearchInstituteModelSchema } from "../../../models/SearchInstituteModel";
import DisplayRows from "../../common/Table/DisplayRows/DisplayRows";
import ReturnToTop from "../../common/ReturnToTop/ReturnToTop";
import Pagination from "../../common/Pagination/Pagination";
import { Tooltip } from "../../common/Tootip/Tooltip";

export default function Institutes() {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(SearchInstituteModelSchema),
    defaultValues: {
      query: null,
      limit: 5,
      offset: 1,
      institution: [],
      territory: [],
      level: [],
      type: [],
      guest: null,
    },
  });

  const [CahcheInstitute, setCahcheInstitute] = useState<any>([]);
  const [Territories, setTerritories] = useState([]);
  const [Levels, setLevels] = useState([]);
  const [Types, setTypes] = useState([]);

  const [Institutes, setInstitutes] = useState([]);

  const [DeleteInstitute, setDeleteInstitute] = useState<any>({});
  const [DeleteInstituteRespone, setDeleteInstituteRespone] = useState("");

  const [Count, setCount] = useState<any>();
  const [TotalData, setTotalData] = useState<any>();

  const [limitAndOffset, setlimitAndOffset] = useState({
    limit: 5,
    offset: 1,
  });

  const [sortData, setsortData] = useState({ order: 1, sort_by: "" });

  const [action, setaction] = useState("search");
  const [ActionInstituteId, setActionInstituteId] = useState("");

  const [viewNewData, setviewNewData] = useState(false);

  const { handleLoading } = useOutletContext<any>();

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

  const getInstitutes = useMemo(async () => {
    const token = sessionStorage.getItem("Access");
    handleLoading(true);
    const res: { success: Number; data: []; message: String; count: any } =
      await GetDataService("institute/", token, {
        query: methods.getValues("query"),
        limit: methods.getValues("limit"),
        offset: methods.getValues("offset"),
        search_institutions:
          methods.getValues("institution") !== undefined
            ? methods
                .getValues("institution")
                .map((item: any) => item.value)
                .join("&&")
            : "",
        search_territory:
          methods.getValues("territory") !== undefined
            ? methods
                .getValues("territory")
                .map((item: any) => item.value)
                .join("&&")
            : "",
        search_level:
          methods.getValues("level") !== undefined
            ? methods
                .getValues("level")
                .map((item: any) => item.value)
                .join("&&")
            : "",
        order: sortData.order,
        sort_by: sortData.sort_by,
      });
    if (res.success === 1) {
      setInstitutes(res.data);
      setTotalData(res.count);
      setCount(Math.ceil(parseInt(res.count) / methods.getValues("limit")));
      handleLoading(false);
    }
    if (res.success === 0) {
      setInstitutes([]);
      setTotalData(0);
      setCount(0);
      handleLoading(false);
    }
    return true;
  }, [limitAndOffset, DeleteInstituteRespone, viewNewData, sortData]);

  const onSubmit = (data: any) => {
    const token = sessionStorage.getItem("Access");
    methods.setValue("limit", 5);
    methods.setValue("offset", 1);
    handleLoading(true);
    GetDataService("institute/", token, {
      query: data.query !== null ? data.query : "",
      search_institutions:
        data.institution !== undefined && data.institution.length > 0
          ? data.institution.map((item: any) => item.value).join("&&")
          : "",
      search_territory:
        data.territory !== undefined && data.territory.length > 0
          ? data.territory.map((item: any) => item.value).join("&&")
          : "",
      search_level:
        data.level !== undefined && data.level.length > 0
          ? data.level.map((item: any) => item.value).join("&&")
          : "",
      search_type:
        data.type !== undefined && data.type.length > 0
          ? data.type.map((item: any) => item.value).join("&&")
          : "",
      guest:
        data.guest !== undefined && data.guest !== null ? data.guest.value : "",
    }).then((res: any) => {
      if (res.success === 1) {
        setInstitutes(res.data);
        setTotalData(res.count);
        setCount(Math.ceil(parseInt(res.count) / methods.getValues("limit")));
        handleLoading(false);
      } else if (res.success === 0) {
        setInstitutes([]);
        setTotalData(0);
        setCount(0);
        handleLoading(false);
      }
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("Access");
    handleLoading(true);

    GetDataService("institute/territory", token, {}).then((data: any) => {
      setTerritories(
        data.map((item: any) => {
          return { label: item, value: item };
        })
      );
    });

    GetDataService("institute/level", token, {}).then((data: any) => {
      setLevels(
        data.map((item: any) => {
          return { label: item, value: item };
        })
      );
    });

    GetDataService("institute/type", token, {}).then((data: any) => {
      setTypes(
        data.map((item: any) => {
          return { label: item, value: item };
        })
      );
    });
    return handleLoading(false);
  }, []);

  useEffect(() => {
    handleLoading(true);
    const token = sessionStorage.getItem("Access");

    const order = sessionStorage.getItem("Instituteorder");
    const sort_by = sessionStorage.getItem("Institutesort_by");

    if (sort_by !== undefined && sort_by !== null) {
      if (order !== null && order !== undefined) {
        setsortData({ order: parseInt(order), sort_by: sort_by });
      }
    }
    GetDataService("institute/", token, {
      order: order !== undefined && order !== null ? parseInt(order) : 1,
      sort_by: sort_by !== undefined && sort_by !== null ? sort_by : "_id",
    }).then((res: any) => {
      if (res.success === 1) {
        setInstitutes(res.data);
        setCount(Math.ceil(parseInt(res.count) / 5));
        setTotalData(res.count);
      } else {
        setInstitutes([]);
        setCount(0);
        setTotalData(0);
      }
    });
    return handleLoading(false);
  }, []);

  const handleDelete = () => {
    handleLoading(true);
    const token = sessionStorage.getItem("Access");
    DeleteDataService("user/", token, DeleteInstitute._id).then((res) => {
      handleLoading(false);
      setDeleteInstituteRespone(res.message);
    });
  };

  const handleConfirmationForDelete = (data: any) => {
    setDeleteInstitute(data);
    document.getElementById("deleteInstituteModal")?.click();
  };

  // handle Display Rows
  const handleDisplayRows = (data: any) => {
    sessionStorage.setItem("limit", data);
    methods.setValue("limit", parseInt(data));
    methods.setValue("offset", 1);
    sessionStorage.setItem("offset", "1");
    setlimitAndOffset({
      offset: 0,
      limit: parseInt(data),
    });
  };

  // handle return to top
  const handleReturnToTop = () => {
    setaction("search");
    sessionStorage.setItem("Instituteaction", "search");
  };

  // on page up
  const handlePageUp = (data: any) => {
    const offset = limitAndOffset.offset;
    if (offset < parseInt(Count)) {
      methods.setValue("offset", offset + 1);
      sessionStorage.setItem("offset", (offset + 1).toString());
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
      sessionStorage.setItem("offset", (offset - 1).toString());
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
      sessionStorage.setItem("offset", data);
    }
  };

  // handle institute edit
  const handleInstituteEdit = (data: any) => {
    setActionInstituteId(data);
    setaction("edit");
  };

  // for sort data according to the field
  const handleSorting = (data: any) => {
    setsortData({
      sort_by: data.sort_by,
      order: data.order,
    });
  };

  // for view the latest data
  const HandleNewData = (value: boolean) => {
    if (viewNewData === true) setviewNewData(false);
    else setviewNewData(value);
  };

  return (
    <div className="container px-2 text-primary">
      <div className="capitalize text-lg">institutes</div>
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
              <label className="capitalize">Territory</label>
              <SingleSelect
                fieldname="territory"
                placeholder="Select Territory"
                isMulti={true}
                options={Territories}
                isSearchable={false}
              />
            </div>
            <div>
              <label className="capitalize">Institution level</label>
              <SingleSelect
                fieldname="level"
                placeholder="Select Level"
                isMulti={true}
                options={Levels}
                isSearchable={false}
              />
            </div>
            <div>
              <label htmlFor=""> Institution Type</label>
              <SingleSelect
                fieldname="type"
                placeholder="Select Type"
                isMulti={true}
                options={Types}
                isSearchable={false}
              />
            </div>
            <div>
              <label htmlFor="">Guest Institution</label>
              <SingleSelect
                fieldname="guest"
                placeholder="Select..."
                options={[
                  { label: "Yes", value: "true" },
                  { label: "No", value: "false" },
                ]}
                isSearchable={false}
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
                id="InstituteSearchReset"
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
                  sessionStorage.setItem("Instituteaction", "new");
                }}
              >
                &#43; create institute
              </button>
            </div>
          </div>
          <div>
            <div className="conatiner py-1  mt-5" id="userTableParentDiv">
              {Institutes && (
                <>
                  {Institutes.length > 0 && (
                    <Table
                      data={Institutes}
                      isFor={"Institute"}
                      handleEdit={handleInstituteEdit}
                      handleDelete={handleConfirmationForDelete}
                      handleSort={handleSorting}
                    >
                      <ShowDataQuery TotalData={TotalData} />
                    </Table>
                  )}
                </>
              )}
              {Institutes.length === 0 && (
                <>
                  <div className="capitalize w-full  text-center text-3xl mt-10">
                    There is No Data To show
                  </div>
                </>
              )}
            </div>
          </div>
          {Institutes.length > 0 && (
            <div className="flex my-5 justify-between">
              <Pagination
                handlePageUp={handlePageUp}
                handlePageDown={handlePageDown}
                handlePageJump={handlePageJump}
                lastPage={Count}
              />
              <DisplayRows
                handleChange={handleDisplayRows}
                TotalData={TotalData}
              />
            </div>
          )}
        </form>
      </FormProvider>
      {/* for conformation  */}
      <Modal
        id="deleteInstituteModal"
        handleConform={handleDelete}
        modalText={`Are you sure , You want to delete "${DeleteInstitute.name}" ?`}
        isFor={"warning"}
      />
      {action !== "search" && <ReturnToTop handleReturn={handleReturnToTop} />}
      {action === "new" && (
        <CreateInstitute
          levels={Levels}
          types={Types}
          territories={Territories}
          viewCreatedData={HandleNewData}
        />
      )}
      {action === "edit" && (
        <UpdateInstitute
          instituteId={ActionInstituteId}
          levels={Levels}
          types={Types}
          territories={Territories}
          viewUpdatedData={HandleNewData}
        />
      )}

      {/* tooltips  */}
      <Tooltip id={"InstituteSearchLabel"} />
    </div>
  );
}
