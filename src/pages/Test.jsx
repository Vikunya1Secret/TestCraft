import React, { useState } from "react";
import { data } from "../constants";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Test = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full bg-color min-h-[100vh] h-full">
      <Navbar />
      <div className="max-w-[1160px] mx-auto  px-5 py-10">
        <h3 className="font-bold text-[24px] mb-10 text-[#3D568F] ">
          Все тесты
        </h3>
        <div>
          {data.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between w-full h-[84px] px-[34px] bg-white shadow-lg mb-5  rounded-[20px]">
                <div className="flex items-center gap-x-10">
                  <p className="text-[22px] text-[#3D568F] font-bold">
                    {item.name}
                  </p>
                  <p className="text-[16px] text-[#F68D88]">{item.types}</p>
                </div>
                <div className="flex items-center gap-x-5">
                  <p className="text-[16px] text-[#3D568F] font-semibold">
                    {item.result}
                  </p>
                  {activeIndex === index ? (
                    <img
                      onClick={() => toggleIndex(index)}
                      className="w-5 h-2.5 cursor-pointer transition-transform duration-300"
                      src="./test/top.png"
                      alt="Collapse"
                    />
                  ) : (
                    <img
                      onClick={() => toggleIndex(index)}
                      className="w-5 h-2.5 cursor-pointer transition-transform duration-300"
                      src="./test/bottom.png"
                      alt="Expand"
                    />
                  )}
                </div>
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  activeIndex === index
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-white rounded-[35px] mb-4 p-6">
                  {item.students.map((student, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center pb-4 gap-x-[104px] border-b border-b-[#95B1EE] mb-5"
                    >
                      <div className="flex w-[70%] items-center gap-x-[77px] ">
                        <p className="text-[16px] text-[#3D568F] font-medium">
                          {student.firstname}
                        </p>
                        <p className="text-[16px] text-[#3D568F] font-medium">
                          {student.lastname}
                        </p>
                        <p className="flex items-center gap-x-2.5 text-[16px] text-[#3D568F] font-medium ">
                          <img
                            className="w-5 h-5"
                            src="./test/phone.png"
                            alt=""
                          />
                          {student.phoneNumber}
                        </p>
                        <p className="flex items-center gap-x-2.5 text-[16px] text-[#3D568F] font-medium">
                          <img
                            className="w-5 h-5"
                            src="./test/telegram.png"
                            alt=""
                          />
                          {student.telegramLink}
                        </p>
                      </div>
                      <div className="flex w-[30%] items-center gap-x-10  ">
                        <p className="text-[18px] text-[#F68D88]">
                          {student.Appropriation}
                        </p>
                        <p className="text-[18px] text-[#F68D88]">
                          {student.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Test;
