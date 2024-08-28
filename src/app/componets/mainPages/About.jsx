"use client";
import React, { useState } from "react";
import { Vortex } from "../ui/vortex";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { CardBody, CardContainer, CardItem } from "../ui/3d-cart";
import Link from "next/link";
import data from "../../data.json"; // Assuming your JSON file is in the correct location
import Image from "next/image";
import aboutImage from "../../assets/aboutImg1.png";

const words = `Hello! I'm Monu, a Computer Science and Artificial Intelligence
            student currently pursuing my B.Tech from Newton School of
            Technology. I've honed my skills in Python, C++, HTML, CSS,
            JavaScript, and React. With a passion for leveraging technology to
            solve real-world issues, I decided to engage in B.Tech to refine my
            skills. Beyond coding, I enjoy Robotics and have successfully
            completed more than 100 projects. Let's connect and explore the
            exciting intersection of technology and innovation!
`;

const AboutPage = data.find((page) => page.id === "aboutPage");

const VortexDemoSecond=()=> {
  const [activeSection, setActiveSection] = useState("Skills");

  return (
    <>
      <div className="w-[calc(100%)] mx-auto rounded-md h-screen overflow-hidden" id="about">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h2 className="absolute top-2 w-full text-pink-50 text-2xl md:text-6xl font-bold text-center">
            About Me
          </h2>

          <div className="absolute top-[90px] ml-4 mr-4 w-[calc(90%)] mx-auto">
            <TextGenerateEffect words={words} />
          </div>

          <div className="absolute top-[240px] flex w-full h-full">
            {/* Left side */}
            <div className="w-1/2 flex items-center justify-center mt-[-300px] p-8">
              <CardContainer className="inter-var ml-[30px] w-[400px]">
                <CardBody className="bg-blue-200 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-8 border">
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

            {/* Right side for skill, experience and education */}
            <div className="w-1/2 flex flex-col items-start text-white px-4">
              <div className="flex w-full justify-around">
                <button
                  className={`p-4 transition text-[25px] ease-in-out duration-300 ${
                    activeSection === "Skills"
                      ? "font-bold text-blue-500"
                      : "text-white hover:text-blue-400"
                  }`}
                  onClick={() => setActiveSection("Skills")}
                >
                  Skills
                </button>
                <button
                  className={`p-4 transition text-[25px] ease-in-out duration-300${
                    activeSection === "Experience"
                      ? "font-bold text-blue-500"
                      : "text-white hover:text-blue-400"
                  }`}
                  onClick={() => setActiveSection("Experience")}
                >
                  Experience
                </button>
                <button
                  className={`p-4 transition text-[25px] ease-in-out duration-300 ${
                    activeSection === "Education"
                      ? "font-bold text-blue-500"
                      : "text-white hover:text-blue-400"
                  }`}
                  onClick={() => setActiveSection("Education")}
                >
                  Education
                </button>
              </div>

              <div className="mt-4">
                {activeSection === "Skills" && (
                  <div className="p-4 ml-8">
                    <h1 className="text-2xl md:text-3xl font-bold">Skills</h1>
                    <ul className="list-disc list-inside text-sm md:text-base lg:text-lg">
                      {Object.entries(AboutPage.skills).map(([key, value]) => (
                        <li key={key}>
                          {key}:{" "}
                          {Array.isArray(value) ? value.join(", ") : value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeSection === "Experience" && (
                  <div className="p-4 ml-8">
                    <h1 className="text-2xl md:text-3xl font-bold">
                      Experience
                    </h1>
                    <ul className="list-disc list-inside text-sm md:text-base lg:text-lg">
                      {Object.entries(AboutPage.experience).map(
                        ([key, value]) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {activeSection === "Education" && (
                  <div className="p-4 ml-8">
                    <h1 className="text-2xl md:text-3xl font-bold">
                      Education
                    </h1>
                    <ul className="list-disc list-inside text-sm md:text-base lg:text-lg">
                      {Object.entries(AboutPage.education).map(
                        ([key, value]) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 w-full flex justify-center">
            <button className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded">
              More about me
            </button>
          </div>
        </Vortex>
      </div>
    </>
  );
}

export default VortexDemoSecond;