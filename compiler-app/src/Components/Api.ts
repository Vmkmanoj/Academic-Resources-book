import axios, { AxiosResponse } from "axios";
import language from "./language";

// Define types for the response expected from the API
interface ApiResponse {
  run: {
    output: string;
    stderr?: string;
  };
}

const Api = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

// Define the types for the `excuteCode` function parameters
const excuteCode = async (code: string, langage: string): Promise<ApiResponse> => {
  console.log("from apipage:", code);
  console.log("from api page:", langage);

  try {
    const response: AxiosResponse<ApiResponse> = await Api.post("/execute", {
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
