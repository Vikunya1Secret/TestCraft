import React from "react";

export const FreeResponseSection = ({title, answerOptions}) => {
  // const answerOptions = Array(6).fill("Вариант ответа");

  return (
    <section className="w-full max-w-[704px] mx-auto">
      <div className="w-full rounded-[30px] shadow-[0px_4px_10px_0px_rgba(204,216,233,0.5)] bg-white px-5 pb-6 py-[30px]">
        <h2 className="font-['Raleway',Helvetica] text-[#3D568F] font-semibold text-GSB-nu-i text-lg mb-2">
          {title}
        </h2>

        <p className="font-['Raleway',Helvetica] font-semibold text-[#aaaaaa] text-base text-start mb-6">
          Соотнесите варианты ответов между друг другом.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {answerOptions.map((option, index) => (
            <button
              key={index}
              className="h-11 rounded-[25px] border-[#d2e0ff] bg-white justify-start pl-8 font-['Manrope',Helvetica] font-medium text-[#4a4f55] text-base normal-case border"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};