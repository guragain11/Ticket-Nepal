import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import { Play } from "lucide-react"; // nice clean play icon
import BlurCircle from "./BlurCircle";

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="px-6 md:px-16 lg:px:24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg">Trailers</p>

      <div className="relative mt-6 flex justify-center">
        <BlurCircle top="-100px" right="-100px" />

        {/* Thumbnail with play icon overlay */}
        <div className="relative">
          <img
            src={currentTrailer.image}
            alt="Trailer Thumbnail"
            className="w-[1000px] h-[600px] object-cover rounded-lg border border-gray-700"
          />

          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 rounded-full p-6 hover:scale-110 transition-transform duration-300">
              <Play size={50} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Trailer thumbnails */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {dummyTrailers.map((trailer, index) => (
          <button
            key={index}
            onClick={() => setCurrentTrailer(trailer)}
            className={`w-58 h-30 rounded overflow-hidden border-2 transition-all duration-300 ${
              currentTrailer.image === trailer.image
                ? "border-blue-500 scale-105"
                : "border-transparent hover:border-gray-400"
            }`}
          >
            <img
              src={trailer.image}
              alt={`Trailer ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrailersSection;
