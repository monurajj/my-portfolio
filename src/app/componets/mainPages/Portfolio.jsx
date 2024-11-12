"use client";
import React from "react";
import data from "../../data.json";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

const Portfolio = () => {
  const portfolioPageData = data.find((item) => item.id === "PortfolioPage");

  if (!portfolioPageData) {
    return null; // Handling case where PortfolioPage data is not found
  }

  return (
    <>
      <div id="portfolio" className="py-8 mt-8">
        <div className="container mx-auto">
          <h1 className="mb-6 text-center text-4xl md:text-6xl font-bold mt-8">
            Portfolio
          </h1>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {Object.keys(portfolioPageData).map(
              (item, index) =>
                item !== "id" && (
                  <div
                    key={index}
                    className="p-4 bg-white rounded shadow-md relative overflow-hidden"
                  >
                    {portfolioPageData[item].ImageLink ? (
                      <Image
                        src={portfolioPageData[item].ImageLink}
                        alt={item}
                        layout="responsive" // Responsive layout
                        width={400} // Adjust the width as needed
                        height={300} // Adjust the height as needed
                        className="w-full h-auto object-cover rounded-lg transform transition-transform duration-500 hover:scale-150"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Image+Not+Found";
                        }}
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full rounded-lg"></div>
                    )}
                    <div className="layer absolute inset-0 bg-gradient-to-t from-gray-600 to-pink-500 bg-opacity-75 rounded-lg flex flex-col items-center justify-center p-4 text-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                      <h2 className="text-xl font-semibold text-blue-200 absolute top-2 left-1/2 transform -translate-x-1/2">
                        {item}
                      </h2>
                      <p className="text-gray-200 mt-[-20px] absolute top-1/2 transform -translate-y-1/2">
                        {portfolioPageData[item].p}
                      </p>
                      {portfolioPageData[item].ExploreMore && (
                        <a
                          href={portfolioPageData[item].ExploreMore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center text-xl transition-colors duration-300 absolute bottom-4 left-1/2 transform -translate-x-1/2"
                        >
                          <div>
                            <FaExternalLinkAlt />
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="mt-8 flex justify-center">
            <button className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded">
              Explore more...
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
