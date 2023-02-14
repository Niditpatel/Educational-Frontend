import { AiOutlineWarning } from "react-icons/ai";

export default function Modal(props: any) {
  const { handleConform, modalText, isFor, id } = props;

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
        <div className="modal-dialog relative w-auto pointer-events-none text-primary">
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
            <div className="modal-body relative p-4">{modalText}</div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t  rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5  text-danger font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  handleConform();
                }}
              >
                Yes
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="inline-block px-6 py-2.5 bg-blue-600  font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
