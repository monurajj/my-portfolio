"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaAddressCard,
  FaBars,
  FaTimes,
  FaGithub,
} from "react-icons/fa";
import {
  MdConnectWithoutContact,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { LiaMountainSolid } from "react-icons/lia";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import Image from "next/image";
import GithubCorner from "./GithubCorner";
import logoimage from "../../assets/updatedMonadnocksLogo.jpeg";
import Toast from "./MonadnocksToast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setShowToast(true);
  };

  const handleMouseLeave = () => {
    setShowToast(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-[100] flex justify-between items-center h-14 w-full border-gray-200 bg-white/35 backdrop-blur-lg transition-all">
        {/* Logo Image (Leftmost) */}
        <div className="relative flex items-center ml-8">
          <Image
            className="w-12 h-12 object-cover rounded-full border-yellow-400 border-2"
            src={logoimage}
            alt="Logo Image"
          />
        </div>

        {/* Hide GitHubCorner on Mobile */}
        <div className="hidden md:block">
          <GithubCorner />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="mr-4 md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-xl cursor-pointer" />
          ) : (
            <FaBars className="text-xl cursor-pointer" />
          )}
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 space-x-0 md:space-x-4 bg-gray-800 md:bg-transparent p-4 md:p-0 absolute md:relative top-14 md:top-0 right-0 max-w-xs md:max-w-none transition-transform duration-300 ease-in-out flex items-center space-x-4 md:mr-16 mr-0`}          
        >
          <Link
            href="#home"
            className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500 text-gray-400 md:text-white"
          >
            <FaHome /> Home
          </Link>

          <Link
            href="#about"
            className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500 text-gray-400 md:text-white"
          >
            <FaInfoCircle /> About
          </Link>

          <Link
            href="#services"
            className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500 text-gray-400 md:text-white"
          >
            <FaServicestack /> Services
          </Link>

          <Link
            href="#products"
            className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500 text-gray-400 md:text-white"
          >
            <MdOutlineProductionQuantityLimits /> Products
          </Link>

          <Link
            href="#portfolio"
            className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500 text-gray-400 md:text-white"
          >
            <FaAddressCard /> Portfolio
          </Link>

          {!isOpen ? (
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="flex items-center space-x-2"
          >
            <Link
              href="https://66ca3bae967fc4000942d7ab--aesthetic-lokum-ef0e0b.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500 text-gray-400 md:text-white"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <LiaMountainSolid /> Monadnocks
            </Link>
          </HoverBorderGradient>
          ) :(
            <Link
              href="https://66ca3bae967fc4000942d7ab--aesthetic-lokum-ef0e0b.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500 text-gray-400 md:text-white"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <LiaMountainSolid /> Monadnocks
            </Link>
          )}

          <Link
            href="#contact"
            className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500 text-gray-400 md:text-white"
          >
            <MdConnectWithoutContact /> Contact
          </Link>

          {/* GitHub Link (Visible in Navbar Options on Mobile) */}
          <Link
            href="https://github.com/your-repository"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg flex items-center gap-2 transition-transform hover:scale-110 hover:text-blue-500 text-gray-400 md:hidden"
          >
            <FaGithub /> GitHub
          </Link>
        </div>
      </nav>

      {/* Show Toast when hovering over Monadnocks */}
      {showToast && (
        <Toast
          message="Let’s work together now to build a brighter future"
          onClose={() => setShowToast(false)}
          position="bottom-right"
        />
      )}
    </>
  );
};

export default Navbar;
