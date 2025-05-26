"use client"

import { forwardRef, useImperativeHandle, useState } from "react"
import { Plus, Trash2, X } from "lucide-react"
// import { RxCross2 } from "react-icons/rx";

const Card1 = forwardRef(({ handleDelete, errors = [], id }, ref) => {
  const [options, setOptions] = useState([
    { id: 1, text: "Вариант ответа", selected: true, ball: 1 },
    { id: 2, text: "Вариант ответа", selected: false, ball: "-" },
    { id: 3, text: "Вариант ответа", selected: false, ball: "-" },
  ])
  const [questionText, setQuestionText] = useState("")

  useImperativeHandle(ref, () => ({
    getData: () => ({
      type: "Card1",
      questionText,
      options,
    }),
  }))

  const addOption = () => {
    const newId = Math.max(...options.map((o) => o.id)) + 1
    setOptions([...options, { id: newId, text: "Вариант ответа", selected: false, ball: "-" }])
  }

  const removeOption = (id) => {
    setOptions(options.filter((o) => o.id !== id))
  }

  const selectOption = (id) => {
    setOptions(
      options.map((o) => ({
        ...o,
        selected: o.id === id,
        ball: o.id === id ? 1 : "-",
      })),
    )
  }

  return (
    <div id={id} className="mb-6 bg-white question-card-shadow p-9 rounded-2xl">
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

      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <div key={option.id} className="flex gap-x-5 items-center">
            <button
              className={`w-5 h-5 rounded-full ${
                option.selected ? "bg-[#3d568f] border-2 border-[#3d568f]" : "border-2 border-gray-300 bg-white"
              }`}
              onClick={() => selectOption(option.id)}
            >
              {option.selected && <div className="w-2 h-2 bg-white rounded-full m-auto" />}
            </button>
            <div className="flex-grow border-2 h-11 max-w-[460px] rounded-2xl border-[#D3E1FF] relative">
              <input
                type="text"
                value={option.text}
                onChange={(e) => {
                  const updated = options.map((o) => (o.id === option.id ? { ...o, text: e.target.value } : o))
                  setOptions(updated)
                }}
                className="w-full bg-white rounded-full py-2 px-4 pr-10 border-none outline-none"
              />
              <button
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-[#f68d88]"
                onClick={() => removeOption(option.id)}
              >
                <X />
              </button>
            </div>
            <div className="flex items-center gap-x-2.5">
              <div className="w-10 h-6 border-[#D3E1FF] border-2 text-center text-[16px] text-[#3D568F] rounded-2xl">
                {option.ball}
              </div>
              <p className="text-[16px] text-[#3D568F]">Баллы</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={addOption}
          className="flex cursor-pointer items-center gap-2 bg-white shadow-lg rounded-full py-2 px-4 text-[#3d568f]"
        >
          <Plus className="w-7 h-7 text-white rounded-full bg-[#95B1EE] p-1" />
          Добавить вариант ответа
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center cursor-pointer gap-2 bg-white shadow-lg rounded-full py-2 px-4 text-[#f68d88]"
        >
          <div className="w-7 h-7 p-1.5 bg-[#F68D88] rounded-full flex items-center justify-center">
          <Trash2 className="text-white" />
          </div>
          Удалить вопрос из теста
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

Card1.displayName = "Card1"

export default Card1
