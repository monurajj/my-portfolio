"use client"
import React, { useState } from "react";
import { Vortex } from "../ui/vortex";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { CardBody, CardContainer, CardItem } from "../ui/3d-cart";
import Image from "next/image";
import aboutImage from "../../assets/aboutImg1.png";
import data from "../../data.json";
import Link from "next/link";

const words = `Hello! I'm Monu, a Computer Science and Artificial Intelligence
student currently pursuing my B.Tech from Newton School of
Technology. I've honed my skills in Python, C++, HTML, CSS,
JavaScript, and React. With a passion for leveraging technology to
solve real-world issues, I decided to engage in B.Tech to refine my
skills. Beyond coding, I enjoy Robotics and have successfully
completed more than 100 projects. Let's connect and explore the
exciting intersection of technology and innovation!`;

const AboutPage = data.find((page) => page.id === "aboutPage");


// const handleClickAboutPage=()=>{
//   src={'/AboutPage'}
// }


const VortexDemoSecond = () => {
  const [activeSection, setActiveSection] = useState("Skills");

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-900 to-black" id="about">
      <Vortex
        backgroundColor="transparent"
        className="flex items-center flex-col justify-center w-full min-h-screen"
      >
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-10 py-8">
        <h2 className="text-pink-50 text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-12">
          About Me
        </h2>

        <div className="w-full max-w-4xl mx-auto mb-12 px-4 md:px-8">
          <TextGenerateEffect 
            words={words} 
            className="text-white text-lg md:text-xl leading-relaxed"
          />
        </div>

        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Image section */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <CardContainer className="inter-var w-full max-w-[300px] md:max-w-[400px]">
              <CardBody className="bg-gradient-to-br from-blue-600 to-indigo-500 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-4 md:p-8 border">
                <CardItem translateZ="150" className="w-full">
                  <div className="overflow-hidden rounded-full aspect-square">
                    <Image
                      src={aboutImage}
                      alt="Loading Image..."
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>

          {/* Skills, Experience, and Education section */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-white">
            <div className="flex w-full justify-around mb-6">
              {["Skills", "Experience", "Education"].map((section) => (
                <button
                  key={section}
                  className={`p-2 md:p-4 transition text-base md:text-xl lg:text-2xl ease-in-out duration-300 ${
                    activeSection === section
                      ? "font-bold text-blue-500"
                      : "text-white hover:text-blue-400"
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="w-full bg-black bg-opacity-50 rounded-lg p-4 md:p-6">
              {activeSection === "Skills" && (
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">Skills</h3>
                  <ul className="list-disc list-inside text-sm md:text-base space-y-2">
                    {Object.entries(AboutPage.skills).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-semibold">{key}:</span> {Array.isArray(value) ? value.join(", ") : value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeSection === "Experience" && (
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">Experience</h3>
                  <ul className="list-disc list-inside text-sm md:text-base space-y-2">
                    {Object.entries(AboutPage.experience).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-semibold">{key}:</span> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeSection === "Education" && (
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">Education</h3>
                  <ul className="list-disc list-inside text-sm md:text-base space-y-2">
                    {Object.entries(AboutPage.education).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-semibold">{key}:</span> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 w-full flex justify-center">
          <Link
          // onClick={handleClickAboutPage}
          href={'/AboutPage'}
          className="text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
            More about me
          </Link>
        </div>
      </div>
    </Vortex>
    </div>
  );
}

export default VortexDemoSecond;