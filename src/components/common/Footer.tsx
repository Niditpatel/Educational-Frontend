import point from "../../Images/point.svg";
import { CiTwitter } from "react-icons/ci";
import {
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineInstagram,
} from "react-icons/ai";

export default function Footer() {
  return (
    <div className="px-2 text-white">
      <div className="flex flex-col space-y-4  w-fit md:w-full md:justify-between container mx-auto md:flex-row">
        <div className="flex items-center">
          <img src={point} style={{ height: "50px" }} alt="logo-part" />
          <span className="flex uppercase items-center text-xl ">
            on
            <span className="text-light1 font-semibold">e</span>
            ducation
          </span>
        </div>
        <div className="capitalize ">
          one Education <br />
          2nd floor <br />
          ekyarth <br />
          chharodi <br />
          ahemadabad
          <br />
          gujarat, india
        </div>
        <div className="capitalize ">
          copyright notice <br />
          privacy policy <br />
          terms of use <br />
          accessibility policy <br />
          anti-slavery policy
        </div>
        <div className="capitalize border-t pt-2 border-higher2 md:border-none ">
          registered in india no. 99009900 <br />
          request help <br />
          contact us
          <br />
          knowledge base <br />
          <div className="flex">
            <CiTwitter />
            <AiOutlineInstagram />
            <AiOutlineFacebook />
            <AiOutlineLinkedin />
          </div>
        </div>
      </div>
    </div>
  );
}
