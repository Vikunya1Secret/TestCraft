import React, { useState } from "react";

export const TimerSection = ({answerOptions, title}) => {
  // const [selectedOption, setSelectedOption] = useState("option1");

  return (
    <div className="w-full max-w-[700px] mx-auto">
      <div className="rounded-[30px] shadow-[0px_4px_10px_0px_rgba(204,216,233,0.5)] bg-white px-5 pb-6 py-[30px]">
        <h2 className="text-lg text-[#3D568F] font-semibold text-GSB-nu-i mb-6 font-['Raleway',Helvetica]">
          {title}
        </h2>

        <div className="space-y-3.5">
          {answerOptions.map((option) => (
            <label
            htmlFor={option.id}
              key={option.id}
              className="flex items-center cursor-pointer rounded-[25px] border border-[#D3E1FF] p-2.5"
            >
              <input
                type="radio"
                name="answer"
                // value={option.id}
                id={option.id}
                // checked={selectedOption === option.id}
                // onChange={(e) => setSelectedOption(e.target.value)}
                className="ml-1 mr-2 w-4 h-4"
              />
              <p
                // htmlFor={option.id}
                className="font-['Raleway',Helvetica] font-medium text-[#4a4f55] text-base"
              >
                {option.text}
              </p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};