import { MdClose } from "react-icons/md";

const ReturnToTop = (props: any) => {
  const { handleReturn } = props;
  return (
    <div className="flex justify-end">
      <button
        className="flex items-center space-x-2  text-primary "
        onClick={(e) => {
          e.preventDefault();
          handleReturn();
        }}
      >
        <span>return to top</span> <MdClose className="text-lg" />
      </button>
    </div>
  );
};

export default ReturnToTop;
