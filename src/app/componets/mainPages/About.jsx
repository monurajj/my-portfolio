"use client";
import React, { useState } from "react";
import { Vortex } from "../ui/vortex";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { CardBody, CardContainer, CardItem } from "../ui/3d-cart";
import Image from "next/image";
import aboutImage from "../../assets/aboutImg1.png";
import data from "../../data.json";

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

const VortexDemoSecond = () => {
  const [activeSection, setActiveSection] = useState("Skills");

  return (
    <div className="w-full mx-auto rounded-md min-h-screen overflow-hidden" id="about">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-4 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-pink-50 text-2xl md:text-4xl lg:text-6xl font-bold text-center mb-4 md:mb-8">
          About Me
        </h2>

        <div className="w-full max-w-4xl mx-auto mb-8">
          <TextGenerateEffect words={words} />
        </div>

        <div className="w-full flex flex-col md:flex-row">
          {/* Image section */}
          <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
            <CardContainer className="inter-var w-full max-w-[300px] md:max-w-[400px]">
              <CardBody className="bg-blue-200 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-4 md:p-8 border">
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
          <div className="w-full md:w-1/2 flex flex-col items-start text-white px-4">
            <div className="flex w-full justify-around mb-4">
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

            <div className="w-full">
              {activeSection === "Skills" && (
                <div className="p-2 md:p-4">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Skills</h3>
                  <ul className="list-disc list-inside text-sm md:text-base">
                    {Object.entries(AboutPage.skills).map(([key, value]) => (
                      <li key={key}>
                        {key}: {Array.isArray(value) ? value.join(", ") : value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeSection === "Experience" && (
                <div className="p-2 md:p-4">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Experience</h3>
                  <ul className="list-disc list-inside text-sm md:text-base">
                    {Object.entries(AboutPage.experience).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeSection === "Education" && (
                <div className="p-2 md:p-4">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Education</h3>
                  <ul className="list-disc list-inside text-sm md:text-base">
                    {Object.entries(AboutPage.education).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 w-full flex justify-center">
          <button className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded">
            More about me
          </button>
        </div>
      </Vortex>
    </div>
  );
}

export default VortexDemoSecond;