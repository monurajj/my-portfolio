import Link from "next/link";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaAddressCard,
} from "react-icons/fa";
import {
  MdConnectWithoutContact,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { LiaMountainSolid } from "react-icons/lia";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import logoimage from "../../assets/monadonocks.png";
import Image from "next/image";
import GithubCorner from "./GithubCorner"

const Navbar = () => {
  return (
    <>
    
    <nav className="sticky top-0 z-[100] flex justify-between items-center h-14 w-full border-gray-200 bg-white/35 backdrop-blur-lg transition-all">
    <GithubCorner/>
      {/* Logo Image */}
      <div className="flex items-center ml-4">
        <Image
          className="w-12 h-12 object-cover rounded-full"
          src={logoimage}
          alt="Logo Image"
        />
      </div>
      {/* Navigation Links */}
      <div className="flex items-center space-x-4 mr-16">
        <Link href="#" className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500">
          <FaHome /> Home
        </Link>
        <Link href="#" className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500">
          <FaInfoCircle /> About
        </Link>
        <Link href="#" className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500">
          <FaServicestack /> Services
        </Link>
        <Link href="#" className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500">
          <MdOutlineProductionQuantityLimits /> Products
        </Link>
        <Link href="#" className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500">
          <FaAddressCard /> Portfolio
        </Link>
        <HoverBorderGradient containerClassName="rounded-full" as="button" className="flex items-center space-x-2">
          <Link href="#" className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500">
            <LiaMountainSolid /> Monadonocks
          </Link>
        </HoverBorderGradient>
        <Link href="#" className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500">
          <MdConnectWithoutContact /> Contact
        </Link>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
