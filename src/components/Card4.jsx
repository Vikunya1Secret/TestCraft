"use client"

import { Plus } from "lucide-react"
import { forwardRef, useImperativeHandle, useState } from "react"

const Card4 = forwardRef(({ handleDelete, errors = [], id }, ref) => {
  const [pairs, setPairs] = useState([
    { id: 1, left: "1 пара", right: "1 пара", ball: 1 },
    { id: 2, left: "2 пара", right: "2 пара", ball: "-" },
    { id: 3, left: "3 пара", right: "3 пара", ball: "-" },
  ])

  const [questionText, setQuestionText] = useState("")
  const [totalScore, setTotalScore] = useState(1)

  useImperativeHandle(ref, () => ({
    getData: () => ({
      type: "Card4",
      questionText,
      pairs,
      totalScore,
    }),
  }))

  const addPair = () => {
    const newId = pairs.length > 0 ? Math.max(...pairs.map((p) => p.id)) + 1 : 1
    setPairs([...pairs, { id: newId, left: `${newId} пара`, right: `${newId} пара`, ball: "-" }])
  }

  const removePair = (id) => {
    setPairs(pairs.filter((pair) => pair.id !== id))
  }

  const updatePairLeft = (id, text) => {
    setPairs(pairs.map((pair) => (pair.id === id ? { ...pair, left: text } : pair)))
  }

  const updatePairRight = (id, text) => {
    setPairs(pairs.map((pair) => (pair.id === id ? { ...pair, right: text } : pair)))
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

      {/* Pairs */}
      <div className="space-y-3 mb-6">
        {pairs.map((pair) => (
          <div key={pair.id} className="flex gap-x-5 items-center">
            <div className="flex gap-x-5 h-11 w-full rounded-2xl">
              <div className="flex-1">
                <input
                  type="text"
                  value={pair.left}
                  onChange={(e) => updatePairLeft(pair.id, e.target.value)}
                  className="w-full border-2 border-[#D3E1FF] outline-none bg-white rounded-full py-2 px-4"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={pair.right}
                  onChange={(e) => updatePairRight(pair.id, e.target.value)}
                  className="w-full border-2 border-[#D3E1FF] bg-white rounded-full py-2 px-4 outline-none"
                />
              </div>
              <button className="text-[#f68d88] px-2" onClick={() => removePair(pair.id)}>
                <span className="text-xl">×</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Delete Question Buttons */}
      <div className="flex justify-between">
        <button
          className="flex items-center max-w-[220px] text-center gap-2 h-[50px] bg-white shadow-lg rounded-full py-2 px-4 text-[#3d568f]"
          onClick={addPair}
        >
          <Plus className="w-7 h-7 text-white rounded-full bg-[#95B1EE] p-1" />
          <span className="ml-2 text-[#3D568F] font-semibold text-[14px]">Добавить пару</span>
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

Card4.displayName = "Card4"

export default Card4
