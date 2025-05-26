import React from "react";
import { TimerSection } from "./sections/TimerSection";
import { QuestionListSection } from "./sections/QuestionListSection";
import { AnswerOptionsSection } from "./sections/AnswerOptionsSection";
import { FreeResponseSection } from "./sections/FreeResponseSection/FreeResponseSection.jsx";
import { SubmissionSection } from "./sections/SubmissionSection";
import { useLocation } from "react-router-dom";

const StudentTest = () => {
  const location = useLocation();

  console.log(location);

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1440px]">
        <div className="mx-auto w-full max-w-[780px] py-6 px-4 ">
          <div className="relative w-full rounded-[35px] bg-gradient-to-b from-[rgba(243,241,255,0.5)] to-[rgba(218,230,255,0.5)] shadow-[0px_4px_10px_0px_rgba(204,216,233,0.5)] overflow-hidden">
            <div className="flex flex-col space-y-6 p-6">
              {/* Logo/Icon at the top */}
              <div className="flex justify-center mb-2">
                <div className="relative h-[50px] w-[50px]">
                  <div className="absolute w-[45px] h-[45px] top-0 left-0 bg-[url(/path.svg)] bg-[100%_100%]">
                    <div className="relative w-[25px] h-[22px] top-[11px] left-[9px] bg-[#8fabe852] rounded-[14px] rotate-[-105.71deg] blur-[13.5px]" />
                  </div>
                  <div className="">
                    <img
                      className="absolute top-[9px] left-2"
                      alt="Union"
                      width={50}
                      height={50}
                      src="/logo.png"
                    />
                  </div>
                </div>
              </div>

              {/* Timer display */}
              <div className="flex flex-row items-center justify-center space-x-4">
                <div className="font-bold text-[#3D568F] text-GSB-nu-i text-lg [font-family:'Raleway',Helvetica]">
                  До конца теста осталось:
                </div>
                <div className="bg-white rounded-[20px] border border-solid border-[#d2e0ff] shadow-[0px_4px_10px_0px_rgba(204,216,233,0.5)] px-6 py-2">
                  <div className="[font-family:'Manrope',Helvetica] font-medium text-[#4a4f55] text-base tracking-[0.24px]">
                    1:30:00
                  </div>
                </div>
              </div>

              {/* Main sections */}
              {location.state?.questions?.length ? (
                location.state.questions.map((el) => {
                  if (el.questionType === "singleChoice")
                    return (
                      <TimerSection
                        answerOptions={el.options}
                        title={el.questionText}
                      />
                    );

                  if (el.questionType === "multipleChoice")
                    return (
                      <QuestionListSection
                        answerOptions={el.options}
                        title={el.questionText}
                      />
                    );

                  if (el.questionType === "textInput")
                    return <AnswerOptionsSection title={el.questionText} />;

                  if (el.questionType === "matching")
                    return (
                      <FreeResponseSection
                        answerOptions={el.options}
                        title={el.questionText}
                      />
                    );

                  if (el.questionType === "ordering")
                    return <SubmissionSection answerOptions={el.options} title={el.questionText} />;
                })
              ) : (
                <></>
              )}

              {/* Submit button */}
              <div className="flex justify-center">
                <button className="bg-[#072978] text-white rounded-[35px] px-16 py-4 h-14 shadow-[0px_4px_10px_0px_rgba(204,216,233,0.5)]">
                  <span className="font-bold text-lg [font-family:'Raleway',Helvetica]">
                    Завершить тест
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTest;
