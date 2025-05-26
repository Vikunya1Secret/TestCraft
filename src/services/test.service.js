import { API } from "./api"

const createTest = async(data) => {
  const response = await API.post("/tests", data)
  return response.data
}

export const getTests = async() => {
  const response = await API.get("/tests")
  return response.data
}

export const getTest = async(testId) => {
  const response = await API.get("/tests/" + testId)
  return response.data
}

export const deleteTest = async(testId) => {
  const response = await API.delete("/tests/" + testId)
  return response.data
}

export const createQuestionsToTest = async (testId, questions) => {
  const response = await API.post("/questions/test/" + testId, questions)
  return response.data
}

export const startTest = async (testId, guestInfo) => {
  const response = await API.post("/results/start", {
    testId, guestInfo
  })

  return response.data
}



export default createTest