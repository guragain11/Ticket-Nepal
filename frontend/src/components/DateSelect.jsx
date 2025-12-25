import React, { useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const onBookHandler = () => {
    if (selectedDate) {
      navigate(`/seatlayout/${id}/${selectedDate}`);
    }
  };

  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 border bg-primary/10 border-primary/20 rounded-lg">

        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="50px" right="-100px" />

        <div>
          <p className="text-lg font-semibold">Choose Date</p>

          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />

            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => handleSelectDate(date)}
                  className={`flex flex-col items-center justify-center h-14 w-14 rounded transition-all ${
                    selectedDate === date
                      ? "bg-primary text-white"
                      : "hover:bg-primary/20"
                  }`}
                >
                  <span
                    className={`text-xs ${
                      selectedDate === date
                        ? "text-white/80"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>

                  <span className="text-lg font-semibold">
                    {new Date(date).getDate()}
                  </span>

                  <span
                    className={`text-xs ${
                      selectedDate === date
                        ? "text-white/80"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>

            <ChevronRightIcon width={28} />
          </div>
        </div>

        {/* Book button */}
        <button
          onClick={onBookHandler}
          disabled={!selectedDate}
          className={`px-8 py-2 mt-6 rounded transition-all ${
            selectedDate
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {selectedDate ? "Book Now" : "Select a Date"}
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
