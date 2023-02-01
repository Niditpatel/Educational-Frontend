import { MdModeEditOutline, MdDelete } from "react-icons/md";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

import { useEffect, useState } from "react";

import { resizableGrid } from "./TableColumnResizer/Index";

export default function Table(props: any) {
  const { data, isFor, handleEdit, handleDelete, children } = props;

  const [columnVisibility, setcolumnVisibility] = useState<any>({});

  const [Sort, setSort] = useState({ field: "", order: 2, visible: false });

  useEffect(() => {
    const table: any = document.getElementsByClassName("table");
    for (var i = 0; i < table.length; i++) {
      resizableGrid(table[i], "Table");
    }
  });

  // for column visibility
  useEffect(() => {
    const arr: any = {};
    Object.keys(data[0]).map((item: any) => {
      arr[item] = true;
    });
    setcolumnVisibility(arr);
  }, [data]);

  return (
    <>
      {/* column visibility and showing query  */}
      <div className="flex justify-between items-center">
        <div>{children}</div>
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
            {Object.keys(data[0]).map((item: any, index: any) => (
              <li className="px-2 py-0.5 w-full" key={index}>
                <div className="dropdown-item flex space-x-2 w-full">
                  <input
                    type="checkbox"
                    checked={columnVisibility[item]}
                    className="text-primary w-fit border-primary"
                    onChange={(e) => {
                      setcolumnVisibility({
                        ...columnVisibility,
                        [item]: e.target.checked,
                      });
                    }}
                    defaultChecked
                  />
                  <label className="capitalize">
                    {item
                      .toString()
                      .split(/(?=[A-Z])/)
                      .join(" ")}{" "}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* table data  */}
      <div className="w-full overflow-x-auto overflow-y-hidden h-fit">
        <table
          className="table w-full text-center border-collapse mt-5"
          id="Table"
        >
          <thead>
            <tr className="bg-secondary/[0.6]">
              {Object.keys(data[0]).map((item: any, index: any) => (
                <th
                  key={index}
                  className={`p-1  border  ${
                    columnVisibility[item] === true ? "show" : "hidden"
                  }`}
                >
                  <button
                    className="w-full flex justify-center items-center space-x-1"
                    onDoubleClick={(e) => {
                      e.preventDefault();
                      setSort({
                        order: 1,
                        field: item,
                        visible: true,
                      });
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setSort({
                        ...Sort,
                        order: Sort.order === 1 ? 0 : 1,
                      });
                    }}
                  >
                    <span className="capitalize whitespace-nowrap">
                      {item
                        .toString()
                        .split(/(?=[A-Z])/)
                        .join(" ")}
                    </span>
                    {Sort.visible === true && Sort.field === item && (
                      <>
                        {Sort.order === 1 && <TiArrowSortedUp />}
                        {Sort.order === 0 && <TiArrowSortedDown />}
                      </>
                    )}
                  </button>
                </th>
              ))}
              <th className="capitalize border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: any) => (
              <tr key={index} className="border even:bg-light2">
                {Object.keys(item).map((key: any) => (
                  <td
                    key={key}
                    className={`border px-1 truncate ${
                      columnVisibility[key] === true ? "show" : "hidden"
                    }`}
                  >
                    {item[key]}
                  </td>
                ))}
                <td className="flex p-1 space-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(item._id);
                      sessionStorage.setItem("action", "edit");
                      sessionStorage.setItem("edit" + isFor + "Id", item._id);
                    }}
                  >
                    <MdModeEditOutline />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(item._id);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
