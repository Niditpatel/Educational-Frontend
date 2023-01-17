import spin from "../../Images/spin.png";
export default function Fallback() {
  return (
    <>
      <div className="h-screen  bg-light2/[0.2] w-full">
        <div className="flex space-x-4 mx-auto my-auto w-fit h-screen  justify-center items-center">
          <img src={spin} alt="" className="animate-spin h-16 w-16" />
          <span className="text-6xl">Loading...</span>
        </div>
      </div>
    </>
  );
}
