import { emp_data } from "./data";

import { useState, useEffect } from "react";
import TestModal from "./TestModal";

import img from "../Images/login.jpg";

export const Test = () => {
  const Data = emp_data;
  const [Designation, setDesignation] = useState<any>({
    JuniorSoftwareDev: false,
    TeamLead: false,
    SeniorSoftWareDev: false,
    ProjectManager: false,
  });
  const [Key, setKey] = useState("");

  const [FilterData, setFilterData] = useState<any>([...emp_data]);

  const [Sort, setSort] = useState({ order: "Asc" });

  const [PopUpData, setPopUpData] = useState("");

  const [zoomImage, setZoomImage] = useState({ scale: 300 });
  const onScroll = (e: any) => {
    const div: any = document.getElementById("LandingPage");
    div.style.overflow = "hidden";
    const newScale = zoomImage.scale + e.deltaY * 10;
    setZoomImage({
      scale: newScale,
    });
  };

  const onSearch = () => {
    console.log(Designation);
    if (
      Key !== "" ||
      Designation.JuniorSoftwareDev === true ||
      Designation.TeamLead === true ||
      Designation.SeniorSoftWareDev === true ||
      Designation.ProjectManager === true
    ) {
      let filteredData: any[] = [];
      filteredData = Data.filter((item: any) => {
        if (Key !== "" && Key !== null) {
          if (item.name.toLowerCase().includes(Key.toLowerCase())) {
            return item;
          }
        }
      });
      if (filteredData.length > 0) {
        if (Designation.JuniorSoftwareDev === true) {
          filteredData = filteredData.filter((item: any) => {
            if (item.designation === "Junior software developer") {
              return item;
            }
          });
        }
      } else {
        if (Designation.JuniorSoftwareDev === true) {
          filteredData = Data.filter((item: any) => {
            if (item.designation === "Junior software developer") {
              return item;
            }
          });
        }
      }
      if (filteredData.length > 0) {
        if (Designation.TeamLead === true) {
          filteredData = filteredData.filter(
            (item: any) => item.designation === "Team lead"
          );
        }
      } else {
        if (Designation.TeamLead === true) {
          filteredData = Data.filter(
            (item: any) => item.designation === "Team lead"
          );
        }
      }
      if (filteredData.length > 0) {
        if (Designation.SeniorSoftWareDev === true) {
          filteredData = filteredData.filter(
            (item: any) => item.designation === "Senior software developer"
          );
        }
      } else {
        if (Designation.SeniorSoftWareDev === true) {
          filteredData = Data.filter(
            (item: any) => item.designation === "Senior software developer"
          );
        }
      }
      if (filteredData.length > 0) {
        if (Designation.ProjectManager === true) {
          filteredData = filteredData.filter(
            (item: any) => item.designation === "Project manager"
          );
        }
      } else {
        if (Designation.ProjectManager === true) {
          filteredData = Data.filter(
            (item: any) => item.designation === "Project manager"
          );
        }
      }
      setFilterData(filteredData);
    } else {
      setFilterData(emp_data);
    }
  };

  const OnSort = (order: string) => {
    let sortData;
    if (order === "Asc") {
      sortData = FilterData.sort((a: any, b: any) =>
        a.name > b.name ? 1 : -1
      );
    } else {
      sortData = FilterData.sort((a: any, b: any) =>
        a.name > b.name ? -1 : 1
      );
    }
    setFilterData(sortData);
  };

  const onPopUp = (data: any) => {
    setPopUpData(data);
    document.getElementById("TestPopUp")?.click();
  };

  return (
    <>
      <div className="container w-full">
        <div className="flex justify-between my-5">
          <div className="dropdown relative">
            <button
              className=" dropdown-toggle px-6 py-2 bg-primary text-white font-medium capitalize shadow-md focus:outline-none focus:ring-0 transition duration-150
                ease-in-out flex items-center whitespace-nowrap"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Column
            </button>
            <ul
              className=" dropdown-menu min-w-max h-32 border  overflow-x-hidden overflow-y-auto scrollbar-none  appearance-none absolute hidden bg-white text-base z-20 float-left py-2 list-none
                             text-left   shadow-lg mt-1 m-0 bg-clip-padding "
            >
              <li className="px-2 py-0.5 w-full">
                <div className="dropdown-item flex space-x-2 w-full">
                  <input
                    type="checkbox"
                    className="text-primary w-fit border-primary"
                    onChange={(e) => {
                      setDesignation({
                        ...Designation,
                        JuniorSoftwareDev: e.target.checked,
                      });
                    }}
                  />
                  <label className="capitalize">
                    Junior software developer
                  </label>
                </div>
              </li>
              <li className="px-2 py-0.5 w-full">
                <div className="dropdown-item flex space-x-2 w-full">
                  <input
                    type="checkbox"
                    className="text-primary w-fit border-primary"
                    onChange={(e) => {
                      setDesignation({
                        ...Designation,
                        TeamLead: e.target.checked,
                      });
                    }}
                  />
                  <label className="capitalize">Team lead</label>
                </div>
              </li>
              <li className="px-2 py-0.5 w-full">
                <div className="dropdown-item flex space-x-2 w-full">
                  <input
                    type="checkbox"
                    className="text-primary w-fit border-primary"
                    onChange={(e) => {
                      setDesignation({
                        ...Designation,
                        SeniorSoftWareDev: e.target.checked,
                      });
                    }}
                  />
                  <label className="capitalize">
                    Senior software developer
                  </label>
                </div>
              </li>
              <li className="px-2 py-0.5 w-full">
                <div className="dropdown-item flex space-x-2 w-full">
                  <input
                    type="checkbox"
                    className="text-primary w-fit border-primary"
                    onChange={(e) => {
                      setDesignation({
                        ...Designation,
                        ProjectManager: e.target.checked,
                      });
                    }}
                  />
                  <label className="capitalize">Project Manager</label>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <input
              type="text"
              className="border rounded"
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
            <button
              className="ml-3 border px-3"
              onClick={(e) => {
                e.preventDefault();
                onSearch();
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* {FilterData && (
          <>
            {FilterData.length > 0 && (
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/[0.4]">
                    {Object.keys(FilterData[0]).map((item: any, index: any) => (
                      <th key={index} className="border capitalize">
                        {item === "name" ? (
                          <>
                            <button
                              className="w-full"
                              onClick={(e) => {
                                e.preventDefault();
                                const order =
                                  Sort.order === "Asc" ? "Dsc" : "Asc";
                                setSort({
                                  order: order,
                                });
                                OnSort(order);
                              }}
                            >
                              {item}
                            </button>
                          </>
                        ) : (
                          item
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FilterData.map((item: any, index: any) => (
                    <tr key={index} className="even:bg-light2/[0.3]">
                      {Object.keys(item).map((val: any, index: any) => (
                        <td key={index} className="border text-center px-1">
                          {val === "name" ? (
                            <button
                              className="w-full"
                              onClick={(e) => {
                                e.preventDefault();
                                setPopUpData(item[val]);
                                onPopUp(item[val]);
                              }}
                            >
                              {item[val]}
                            </button>
                          ) : (
                            item[val]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {FilterData.length < 1 && (
              <div className="w-full text-center">There Is No Data To Show</div>
            )}
          </>
        )} */}
      </div>
      <TestModal id={"TestPopUp"} isFor={PopUpData} />
      <div
        className=" border border-primary mx-auto overflow-auto "
        onWheelCapture={onScroll}
        style={{ height: "500px", width: "500px" }}
      >
        {" "}
        <div
          className="w-full flex justify-center"
          style={{
            height: `${zoomImage.scale}px`,
            width: `${zoomImage.scale}px`,
          }}
        >
          <img
            className={`w-full h-full`}
            src={img}
            style={{
              scale: 5,
            }}
            onDragStart={(e) => {
              console.log("hello");
            }}
          />
        </div>{" "}
      </div>
    </>
  );
};
