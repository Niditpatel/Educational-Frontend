import spin from "../../Images/spin.png";
export default function Fallback() {
  return (
    <>
      <div className="h-full w-full">
        <div className="flex space-x-4 mx-auto my-auto">
          <img src={spin} alt="" className="animate-spin h-5 w-5" />
          <span>Loading...</span>
        </div>
      </div>
    </>
  );
}
