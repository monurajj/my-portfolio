"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import profileimage from "../../assets/profileImagenobg.png";
import signImag from "../../assets/sign1.png";
import { BackgroundBeams } from "../ui/background-beams";

const HomePage = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const words = ["India", "Bihar"];

  useEffect(() => {
    const type = () => {
      if (currentCharIndex < words[currentWordIndex].length) {
        setDisplayedText(
          (prev) => prev + words[currentWordIndex][currentCharIndex]
        );
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentCharIndex(0);
          setDisplayedText("");
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000); // Adjust the delay before starting to type the next word
      }
    };
    const typingDelay = setTimeout(type, 200); // Adjust the typing speed
    return () => clearTimeout(typingDelay);
  }, [currentCharIndex, currentWordIndex, words]);

  return (
    <div id="home" className="-z-8 ">
      {/* Background Video */}
      <div className="absolute -z-40 opacity-8">
        <video autoPlay loop muted style={{ width: "100%" }}>
          <source src="/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="min-h-screen ">
        <main className="relative flex items-center top-32">
          <div className="w-[80%] h-[40%] m-8 ml-16 z-10">
            <p className="text-[50px] font-black -webkit-text-stroke-2 -webkit-text-stroke-black bg-gradient-to-r from-yellow-500 to-red-600 text-transparent bg-clip-text animate-anime">
              Student of CSAI
            </p>
            <h1 className="text-[60px] font-black my-5 -webkit-text-stroke-2 -webkit-text-stroke-black bg-gradient-to-r from-red-500 to-green-400 text-transparent bg-clip-text shadow-[rgb(225,11,11)] animate-anime">
              Hi, I'm <span className="text-pink-100">Monu Rajj</span> from{" "}
              <span>{displayedText}</span>
            </h1>
          </div>

          {/* Profile Image */}
          <div className="w-[40%] max-w-[600px] aspect-square z-[40] mt-[50px] mr-20">
            <div className="rounded-[20px] overflow-hidden shadow-glow hover:shadow-glow-lg transition-shadow duration-300">
              <Image
                className="w-full h-full object-cover"
                src={profileimage}
                alt="Profile Image"
              />
            </div>
          </div>
        </main>

        {/* Signature Image */}
        <div className="relative flex justify-center items-center z-10">
          <div className="absolute -bottom-72 flex justify-center items-center h-[100px] w-[300px]">
            <Image
              className="w-full h-full object-cover"
              src={signImag}
              alt="Loading Image..."
            />
          </div>
        </div>

        <div className="z-[-20px]">
          <BackgroundBeams />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
