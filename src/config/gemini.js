// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: "AIzaSyAo5URwMdB0-tIFWKpuO2qKxEuUtW00bWw",
// });

// const runChat = (prompt) => {
//   const response = ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: prompt,
//   });
//   console.log(response.text);
// };

// export default runChat;

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAo5URwMdB0-tIFWKpuO2qKxEuUtW00bWw");

const runChat = async (prompt) => {
  try {
    // Get the generative model - using gemini-pro or the latest available model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest", // or "gemini-1.0-pro"
    });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log(text);
    return text;
  } catch (error) {
    console.error("Error in runChat:", error);
    throw error;
  }
};

export default runChat;