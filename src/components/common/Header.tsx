import { CiSearch } from "react-icons/ci";
import { ImBooks } from "react-icons/im";

import { useRef } from "react";
// import { Logotext } from "./LogoText/Logotext";

export default function Header() {
  const SearchButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container px-2">
      <div className="mt-8 flex justify-between flex-col md:flex-row space-y-4 md:space-y-0">
        <div className="flex items-center text-xl space-x-1 ">
          <ImBooks className="text-primary animate-pulse" />
          <p className="">
            One<span className="font-bold text-primary">E</span>ducation
          </p>
        </div>
        <div className="flex flex-col space-y-4  md:space-x-8 md:flex-row">
          <button className="border bg-light p-1 capitalize bg-primary text-white hover:text-primary hover:bg-white ">
            confirm ownership to copy
          </button>
          <div className="flex justify-between border-b border-primary">
            <input
              type="search"
              placeholder="search books or auther "
              className="px-2 w-full text-primary primary-placeholder focus:outline-none"
              onKeyDown={(e) => {
                if (e.code === "Enter") SearchButtonRef.current?.click();
              }}
            />
            <button
              ref={SearchButtonRef}
              onClick={(e) => {
                console.log("clicked");
              }}
            >
              <CiSearch className="text-primary text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
