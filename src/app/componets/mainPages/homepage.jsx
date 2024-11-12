"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import profileimage from "../../assets/profileImagenobg.png";
import signImage from "../../assets/sign1.png";
import { BackgroundBeams } from "../ui/background-beams";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { motion } from "framer-motion";

const HomePage = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const words = ["India", "Bihar"];
    const type = () => {
      if (currentCharIndex < words[currentWordIndex].length) {
        setDisplayedText((prev) => prev + words[currentWordIndex][currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentCharIndex(0);
          setDisplayedText("");
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    };
    const typingDelay = setTimeout(type, 200);
    return () => clearTimeout(typingDelay);
  }, [currentCharIndex, currentWordIndex]);

  return (
    <div id="home" className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 -z-40 opacity-80">
        <video autoPlay loop muted className="object-cover w-full h-full">
          <source src="/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        <main className="relative flex flex-col items-center justify-center h-full pt-8 px-4">
          <div className="w-full z-10 text-center -mb-8">
            <motion.p
              className="text-3xl font-black bg-gradient-to-r from-yellow-500 to-red-600 text-transparent bg-clip-text animate-anime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Student of CSAI
            </motion.p>
            <motion.h1
              className="text-4xl font-black my-5 bg-gradient-to-r from-red-500 to-green-400 text-transparent bg-clip-text animate-anime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Hi, I&apos;m <span className="text-pink-100">Monu Rajj</span> from{" "}
              <span>{displayedText}</span>
            </motion.h1>
          </div>

          {/* Profile Image */}
          <ContainerScroll>
            <motion.div
              className="w-4/4 max-w-[400px] aspect-square z-[40] mt-"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="rounded-[20px] overflow-hidden shadow-glow hover:shadow-glow-lg transition-shadow duration-300">
                <Image
                  className="w-full h-full object-cover"
                  src={profileimage}
                  alt="Profile Image"
                />
              </div>
            </motion.div>
          </ContainerScroll>
        </main>

        {/* Signature Image */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 mb-8">
          <motion.div
            className="h-[100px] w-[150px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Image
              className="w-full h-full object-contain"
              src={signImage}
              alt="Loading Image..."
            />
          </motion.div>
        </div>
      </div>

      {/* Desktop View (Your Original Code) */}
      <div className="hidden lg:block">
        <main className="relative flex items-center top-32">
          <div className="w-[80%] h-[40%] m-8 ml-16 z-10">
            <motion.p
              className="text-[50px] font-black -webkit-text-stroke-2 -webkit-text-stroke-black bg-gradient-to-r from-yellow-500 to-red-600 text-transparent bg-clip-text animate-anime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Student of CSAI
            </motion.p>
            <motion.h1
              className="text-[60px] font-black my-5 -webkit-text-stroke-2 -webkit-text-stroke-black bg-gradient-to-r from-red-500 to-green-400 text-transparent bg-clip-text shadow-[rgb(225,11,11)] animate-anime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Hi, I&apos;m <span className="text-pink-100">Monu Rajj</span> from{" "}
              <span>{displayedText}</span>
            </motion.h1>
          </div>

          {/* Profile Image */}
          <motion.div
            className="w-[40%] max-w-[600px] aspect-square z-[40] mt-[50px] mr-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="rounded-[20px] overflow-hidden shadow-glow hover:shadow-glow-lg transition-shadow duration-300">
              <Image
                className="w-full h-full object-cover"
                src={profileimage}
                alt="Profile Image"
              />
            </div>
          </motion.div>
        </main>

        {/* Signature Image */}
        <div className="relative flex justify-center items-center z-10">
          <motion.div
            className="absolute -bottom-72 flex justify-center items-center h-[100px] w-[300px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Image
              className="w-full h-full object-cover"
              src={signImage}
              alt="Loading Image..."
            />
          </motion.div>
        </div>
      </div>

      <div className="z-[-20px]">
        <BackgroundBeams />
      </div>
    </div>
  );
};

export default HomePage;