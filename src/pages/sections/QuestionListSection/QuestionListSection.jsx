import React from "react";

export const QuestionListSection = ({ answerOptions, title }) => {
  return (
    <div className="w-full max-w-[702px] mx-auto">
      <div className="rounded-[30px] shadow-[0px_4px_10px_0px_rgba(204,216,233,0.5)] bg-white px-5 pb-6 py-[30px]">
        <div className="mb-6">
          <h3 className="font-['Raleway',Helvetica] text-[#3D568F] text-lg font-semibold leading-[30px]">
            {title}
          </h3>
        </div>

        <div className="space-y-4">
          {answerOptions.map((option, index) => (
            <label
              key={index}
              htmlFor={`option-${index}`}
              className="flex items-center h-11 rounded-[25px] border border-solid border-[#d2e0ff] px-3.5 cursor-pointer"
            >
              <input
                type="checkbox"
                id={`option-${index}`}
                className="peer hidden"
              />
              <div
                className="
                  w-6 h-6 mr-3 
                  bg-[url('/unchecked.png')] 
                  peer-checked:bg-[url('/checked.png')] 
                  bg-contain bg-no-repeat
                "
              ></div>
              <span className="font-['Raleway',Helvetica] font-medium text-[#4a4f55] text-base">
                {option.text}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
