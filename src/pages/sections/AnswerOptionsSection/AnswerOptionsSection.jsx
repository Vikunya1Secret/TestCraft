import React from "react";

export const AnswerOptionsSection = ({title}) => {
  return (
    <div className="w-full max-w-[702px] mx-auto">
      <div className="rounded-[30px] shadow-[0px_4px_10px_0px_rgba(204,216,233,0.5)] bg-white px-5 pb-6 py-[30px]">
        <div className="flex flex-col gap-6">
          <h3 className="text-GSB-nu-i text-[#3D568F] text-start text-lg font-semibold leading-[30px] font-['Raleway',Helvetica] tracking-[0]">
            {title}
          </h3>

          <div className="w-full">
            <input
              className="w-full h-11 placeholder:text-[#4A4F55] rounded-[25px] border-[#d2e0ff] pl-8 font-['Raleway',Helvetica] font-medium text-[#4a4f55] border"
              placeholder="Введите свой ответ"
            />
          </div>
        </div>
      </div>
    </div>
  );
};