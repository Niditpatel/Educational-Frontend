import "tw-elements";

import education1 from "../../Images/education1.jpg";
import eduaction2 from "../../Images/education2.jpg";
import education3 from "../../Images/education3.jpg";
import education4 from "../../Images/education4.jpg";

import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Ping = () => {
  return (
    <div className="absolute -top-1 -right-0.5  bg-primary  rounded-full">
      <div className="h-3 w-3 bg-primary animate-ping rounded-full"></div>
    </div>
  );
};

export default function LandingPageContent() {
  const { handleLoading } = useOutletContext<any>();

  useEffect(() => {
    handleLoading(true);
    return handleLoading(false);
  }, []);

  return (
    <>
      {/* for small devices  */}
      <div className="container md:hidden">
        <div
          id="LandingPageCarousel"
          className="carousel slide relative"
          data-bs-ride="carousel"
          data-bs-interval="2500"
        >
          <div className="carousel-inner relative w-full h-40 overflow-hidden">
            <div className="carousel-item active relative float-left w-full">
              <img src={education1} className="block w-full" alt="" />
            </div>
            <div className="carousel-item relative float-left w-full">
              <img src={eduaction2} className="block w-full" alt="education2" />
            </div>
            <div className="carousel-item relative float-left w-full">
              <img src={education3} className="block w-full" alt="" />
            </div>
            <div className="carousel-item relative float-left w-full">
              <img src={education4} className="block w-full" alt="" />
            </div>
          </div>
        </div>
        <div className="flex mt-5  text-2xl space-y-4 flex-col md:hidden text-primary">
          <div className="relative border border-secondary bg-light2 px-3 py-2  shadow-xl shadow-secondary">
            check latest features
            <Ping />
          </div>
          <div className="relative border border-secondary bg-light2 px-3 py-2  shadow-xl shadow-secondary">
            view latest bloges
            <Ping />
          </div>
          <div className="relative border border-secondary bg-light2 px-3 py-2  shadow-xl shadow-secondary">
            view latest books
            <Ping />
          </div>
          <div className="relative border border-secondary bg-light2 px-3 py-2  shadow-xl shadow-secondary">
            view latest magagine
            <Ping />
          </div>
        </div>
      </div>

      {/* for medium or large device  */}
      <div className="container mx-auto hidden text-primary  md:block">
        <div className="flex justify-between py-12 ">
          <div className="basis-1/3">
            <div className="mb-24 relative group ">
              <img src={education1} className="w-full h-full" alt="" />
              <div className="absolute inset-0 items-center justify-center hover:bg-primary/[0.7] ">
                <div className="py-2 w-max group-hover:w-full  bg-white px-1 mx-auto mt-[25%]">
                  <button className="uppercase w-full text-xl tracking-widest semibold text-center ">
                    <span>new featurs</span>
                  </button>
                </div>
              </div>
              <Ping />
            </div>
            <div className=" relative group ">
              <img src={eduaction2} className="w-full h-full" alt="" />
              <div className="absolute inset-0 items-center justify-center hover:bg-primary/[0.7] ">
                <div className="py-2 w-max group-hover:w-full  bg-white px-1 mx-auto mt-[25%]">
                  <button className="uppercase w-full text-xl tracking-widest semibold text-center ">
                    <span> latest blogs</span>
                  </button>
                </div>
              </div>
              <Ping />
            </div>
          </div>
          <div className="basis-1/3 my-auto mx-auto  ">
            <div className=" flex flex-warp flex-col items-center justify-center  text-2xl uppercase text-center italic  lg:text-5xl ">
              <p className="my-4">one</p>
              <p className="my-2">education</p>
            </div>
          </div>
          <div className="basis-1/3">
            <div className="mb-24 relative group ">
              <img src={education3} className="w-full h-full" alt="" />
              <div className="absolute inset-0 items-center justify-center hover:bg-primary/[0.7] ">
                <div className="py-2 w-max group-hover:w-full  bg-white px-1 mx-auto mt-[25%]">
                  <button className="uppercase w-full text-xl tracking-widest semibold text-center ">
                    <span>latest books</span>
                  </button>
                </div>
              </div>
              <Ping />
            </div>
            <div className="relative group ">
              <img src={education4} className="w-full h-full" alt="" />
              <div className="absolute inset-0 items-center justify-center hover:bg-primary/[0.7] ">
                <div className="py-2 w-max group-hover:w-full  bg-white px-1 mx-auto mt-[25%]">
                  <button className="uppercase w-full text-xl tracking-widest semibold text-center  ">
                    <span>view magagine</span>
                  </button>
                </div>
              </div>
              <Ping />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
