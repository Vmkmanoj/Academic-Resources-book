import axios from "axios";
import language from "./language";

const Api = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const excuteCode = async (code, langage) => {

  console.log("from apipage:",code);

  console.log("from api page:",langage)
    
  try {
    const response = await Api.post("/execute", {
      language: langage,
      version: language[langage],
      files: [
        {
          content: code,
        },
      ],
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Error while executing code.");
  }
};

export default excuteCode;
