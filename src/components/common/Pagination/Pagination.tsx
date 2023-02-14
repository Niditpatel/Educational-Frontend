import { useFormContext } from "react-hook-form";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

const Pagination = (props: any) => {
  const { handlePageUp, handlePageDown, handlePageJump, lastPage } = props;

  const methods = useFormContext();

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePageDown();
        }}
      >
        <BsFillCaretLeftFill />
      </button>
      <input
        type="number"
        id="offsetForUserManagement"
        className="w-10 mx-3 text-center appearance-none border-b border-primary focus:outline-none "
        {...methods.register("offset")}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/e/g, "");
          if (parseInt(e.target.value) < 1) {
            e.target.value = "";
          }
          if (parseInt(e.target.value) > lastPage) {
            e.target.value = lastPage;
          }
          handlePageJump(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.code === "KeyE") {
            e.preventDefault();
          }
        }}
        onWheel={(e: any) => {
          e.target.blur();
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePageUp();
        }}
      >
        <BsFillCaretRightFill />
      </button>
    </div>
  );
};

export default Pagination;
