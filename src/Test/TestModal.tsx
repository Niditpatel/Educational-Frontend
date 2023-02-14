import { AiOutlineWarning } from "react-icons/ai";
import { useState, useEffect } from "react";

import { emp_data } from "./data";

export default function TestModal(props: any) {
  const { isFor, id } = props;
  const [UserData, setUserData] = useState<any>([]);

  const [ReportingHeads, setReportingHeads] = useState<any>([]);

  useEffect(() => {
    const userdata = emp_data.filter((item: any) => {
      if (item.name === isFor) {
        return item;
      }
    });
    setUserData(userdata);
    const RHs = emp_data.filter((item: any) => {
      if (item.repoting_head === isFor) {
        return item;
      }
    });
    setReportingHeads(RHs);
  }, [isFor]);

  return (
    <>
      <button
        id={id}
        className="hidden"
        data-bs-toggle="modal"
        data-bs-target={"#confirm" + id}
      ></button>
      <div
        className="modal fade fixed top-20 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id={"confirm" + id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b  rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal "
                id="exampleModalLabel"
              >
                <div
                  className={`flex items-center space-x-2 ${
                    isFor === "warning" ? "text-danger" : "text-success"
                  }`}
                >
                  {isFor === "warning" ? (
                    <>
                      <AiOutlineWarning /> <span> Alert</span>
                    </>
                  ) : (
                    <>
                      <span>success</span>
                    </>
                  )}{" "}
                </div>
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-secondary border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-primary hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <div>User</div>
              {UserData && (
                <>
                  {UserData.length > 0 && (
                    <table>
                      <thead>
                        <tr className="bg-primary/[0.4]">
                          {Object.keys(UserData[0]).map(
                            (item: any, index: any) => (
                              <th key={index} className="border capitalize">
                                {item}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {UserData.map((item: any, index: any) => (
                          <tr key={index} className="even:bg-light2/[0.3]">
                            {Object.keys(item).map((val: any, index: any) => (
                              <td
                                key={index}
                                className="border text-center px-1"
                              >
                                {item[val]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
              <div>Reporting Head of </div>
              {ReportingHeads && (
                <>
                  {ReportingHeads.length > 0 && (
                    <table>
                      <thead>
                        <tr className="bg-primary/[0.4]">
                          {Object.keys(ReportingHeads[0]).map(
                            (item: any, index: any) => (
                              <th key={index} className="border capitalize">
                                {item}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {ReportingHeads.map((item: any, index: any) => (
                          <tr key={index} className="even:bg-light2/[0.3]">
                            {Object.keys(item).map((val: any, index: any) => (
                              <td
                                key={index}
                                className="border text-center px-1"
                              >
                                {item[val]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
