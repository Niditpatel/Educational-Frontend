import notfound from "../../../Images/notfound.jpg";
export default function ErrorPage() {
  return (
    <>
      <div className="w-fit mx-auto">
        <img
          src={notfound}
          alt=""
          className="h-48 w-48 md:w-96 md:h-[400px] lg:h-[550px] lg:w-[550px]"
        />
      </div>
    </>
  );
}
