"use client"
import React from "react";
import data from "../data.json";
import Image from "next/image";

export default function GamesPage() {
  const games = data.find((item) => item.id === "Games");
  
  // Convert games object to array for mapping
  const gamesArray = Object.values(games || {}).filter(game => game["Game Name"]);

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      {/* Page Title */}
      <header className="text-center py-10 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold">Our Games</h1>
        <p className="text-lg mt-2">Engage and have fun with our exciting games!</p>
      </header>

      {/* Games Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesArray.map((game, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Game Image */}
              <div className="relative w-full h-48 overflow-hidden">
  <Image
    src={game.ImageLink} 
    alt={game["Game Name"]}
    fill
    className="object-cover hover:scale-105 transition-transform duration-300"
  />
</div>

              
              {/* Game Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {game["Game Name"]}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {game.About}
                </p>
              </div>

              {/* Button Container */}
              <div className="px-6 pb-6">
                <button
                  className={`w-full py-2 px-4 rounded-md transition-colors duration-300 ${
                    game.PlayNow === "Link is not available"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  disabled={game.PlayNow === "Link is not available"}
                  onClick={() => {
                    if (game.PlayNow !== "Link is not available") {
                      window.location.href = game.PlayNow;
                    }
                  }}
                >
                  {game.PlayNow === "Link is not available" ? "Coming Soon" : "Play Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}