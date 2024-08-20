"use client"
import React from 'react';
import data from "../../data.json";
import {HoverEffect} from "../../componets/ui/card-hover-effect"


const Services = () => {
  // Find the servicePage object in the data array
  const servicePage = data.find(page => page.id === "sevicePage");

  if (!servicePage) {
    return null; // Handle case where servicePage is not found
  }

  return (
    <>
    
    <div>
      
    <div id="services" className="mx-auto w-90vw mb-[20px] ml-[40px] mr-[40px]">
        
      <div>
        

        <h1 className="mb-6 text-center text-4xl md:text-6xl font-bold mt-8">My services</h1>
        <div className="absolute -z-40 opacity-8">
        <video autoPlay loop muted style={{ width: "100%" }}>
          <source src="/bgvideoservices.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          
          {Object.keys(servicePage).map((key) => {
            if (typeof servicePage[key] === 'object' && key !== 'id') {
              return (
                <>
                

                <div key={key} className="bg-gray-800 p-8 text-center rounded-lg shadow-lg hover:bg-yellow-700 transform transition duration-300">
                
                  <h2 className="text-2xl font-semibold mb-3">{key}</h2>
                  <p className="text-gray-300 text-base mb-4">
                    {servicePage[key].p}
                  </p>
                  {servicePage[key].Demolink && 
                    <a href={servicePage[key].Demolink} target="_blank" rel="noopener noreferrer" className="text-green-500 text-lg inline-block">
                      {key === "Video Editing" ? "Watch Demo" : "Learn more"}
                    </a>
                  }
                  {!servicePage[key].Demolink &&
                    <span className="text-green-500 text-lg inline-block">Link not available</span>
                  }
                </div>
                </>
              );
            }
            return null;
          })}
          </div>
        </div>
        <div className="mt-9 bottom-4 w-full flex justify-center">
            <button className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded">
              All services
            </button>
          </div>
      </div>
    </div>
    
    </>
  );
}

export default Services;
