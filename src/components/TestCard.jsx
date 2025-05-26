import { deleteTest } from "../services/test.service"

export default function TestCard({test}) {

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + "/test-registration?test=" + test._id)
  }

  const handleDelete = () => {
    deleteTest(test.id)
  }

  return (
    <div className="bg-white rounded-xl text-center shadow-sm p-6">
      <h3 className="text-[#3d568f] text-[22px] font-bold mb-2">{test.title}</h3>
      <div className="text-[#95B1EE] text-[16px] mb-1.5">{test.questionsCount} вопросов</div>
      <div className="text-[#3D568F] text-[16px] mb-4">Нет ответов</div>
      <div className="flex bg-[#EFF5FF] max-w-[190px] justify-center items-center mx-auto h-[46px] rounded-2xl space-x-4">
        <button className="text-[#3d568f]">
          <img className="w-[32px] h-[32px] mt-2" src="./test/edit.png" alt="" />
        </button>
        <button onClick={handleDelete} className="text-[#f68d88] cursor-pointer">
          <img className="w-[18px] h-[18px] mt-[2px]" src="./test/delete.png" alt="" />
        </button>
        <button onClick={handleCopy} className="text-[#3d568f] cursor-pointer">
          <img className="w-[32px] h-[32px] mt-2" src="./test/link.png" alt="" />
        </button>
      </div>
    </div>
  )
}