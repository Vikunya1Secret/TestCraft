"use client"

import { Plus } from "lucide-react"
import { forwardRef, useImperativeHandle, useState } from "react"

const Card5 = forwardRef(({ handleDelete, errors = [], id }, ref) => {
  const [steps, setSteps] = useState([
    { id: 1, text: "1 шаг", order: 1 },
    { id: 2, text: "2 шаг", order: 2 },
    { id: 3, text: "3 шаг", order: 3 },
  ])

  const [questionText, setQuestionText] = useState("")
  const [totalScore, setTotalScore] = useState(1)

  useImperativeHandle(ref, () => ({
    getData: () => ({
      type: "Card5",
      questionText,
      steps,
      totalScore,
    }),
  }))

  const addStep = () => {
    const newId = steps.length > 0 ? Math.max(...steps.map((s) => s.id)) + 1 : 1
    setSteps([...steps, { id: newId, text: `${newId} шаг`, order: steps.length + 1 }])
  }

  const removeStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  const updateStepText = (id, text) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, text } : step)))
  }

  return (
    <div id={id} className="mb-6 question-card-shadow bg-white p-9 rounded-2xl">
      <div className="relative mb-6">
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Введите текст вопроса"
          className={`w-full text-center bg-transparent border-none outline-none placeholder:text-[20px] placeholder:text-[#3D568F] placeholder:font-medium ${
            errors.includes("Пожалуйста, введите текст вопроса") ? "border-2 border-[#F68D88] rounded-xl" : ""
          }`}
        />
        {errors.includes("Пожалуйста, введите текст вопроса") && (
          <p className="text-[#F68D88] text-sm text-center mt-1">Пожалуйста, введите текст вопроса</p>
        )}
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        {steps.map((step) => (
          <div key={step.id} className="flex gap-x-5 items-center">
            <div className="flex-grow border-2 h-11 w-full max-w-[460px] rounded-2xl border-[#D3E1FF] relative">
              <input
                type="text"
                value={step.text}
                onChange={(e) => updateStepText(step.id, e.target.value)}
                className="w-full bg-white rounded-full py-2 px-4 pr-16 border-none outline-none"
              />
              <div className="absolute right-9 w-[15px] top-1/2 transform -translate-y-1/2 cursor-move">≡</div>
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f68d88]"
                onClick={() => removeStep(step.id)}
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Delete Question Buttons */}
      <div className="flex justify-between">
        <button
          className="flex items-center max-w-[220px] text-center gap-2 h-[50px] bg-white shadow-lg rounded-full py-2 px-4 text-[#3d568f]"
          onClick={addStep}
        >
          <Plus className="w-7 h-7 text-white rounded-full bg-[#95B1EE] p-1" />
          <span className="ml-2 text-[#3D568F] font-semibold text-[14px]">Добавить шаг</span>
        </button>
        <div className="text-center">
          <p className="text-[16px] font-semibold text-[#3D568F]">Баллы</p>
          <input
            type="number"
            value={totalScore}
            onChange={(e) => setTotalScore(Number.parseInt(e.target.value) || 1)}
            className="w-12 h-7 rounded-2xl text-[16px] font-semibold text-[#3D568F] shadow-lg p-1 text-center outline-none"
          />
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-white shadow-lg rounded-full py-2 px-4 text-[#f68d88]"
        >
          <div className="w-7 h-7 p-1 bg-[#F68D88] rounded-full flex items-center justify-center">
            <span className="text-white">×</span>
          </div>
          <span className="text-[#F68D88] text-[14px] font-semibold">Удалить вопрос из теста</span>
        </button>
      </div>
      {errors.length > 0 && !errors.includes("Пожалуйста, введите текст вопроса") && (
        <div className="mt-4">
          {errors.map((error, index) => (
            <p key={index} className="text-[#F68D88] text-sm">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  )
})

Card5.displayName = "Card5"

export default Card5
