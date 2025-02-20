export async function sendMsgToOpenAI(message: string): Promise<string> {
  try {
    console.log("Making POST request to backend with message:", message); // Add this line
    const response = await fetch("http://127.0.0.1:5173/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (response.status === 429) {
      return "Rate limit exceeded. Try again later.";
    }

    const data = await response.json();
    return data.response || "Error processing request.";
  } catch (error) {
    console.error("Error communicating with backend:", error);
    return "Server error. Try again later.";
  }
}

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "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",
//   dangerouslyAllowBrowser: true
// });

// export async function sendMsgToOpenAI(message: string): Promise<string> {
//   try {
//     const res = await openai.completions.create({
//       model: "gpt-4o",
//       prompt: message,
//       temperature: 0.7,
//       max_tokens: 50,
//     });
//     const now = Date.now();
//     let lastRequestTime = 0;
//     if (now - lastRequestTime < 3000) {  // 3-second delay
//         console.warn("You're sending requests too fast. Please wait.");
//         return "You're sending messages too fast. Try again in a few seconds.";
//     }
//     lastRequestTime = now;
//   return res.choices[0]?.text ?? "No response from OpenAI.";
//   } catch (error) {
//     console.error("Error communicating with OpenAI:", error);
//     return "Error processing your request.";
//   }
// }

// import OpenAIAPI from 'openai';
// import Configuration from 'openai';
// const OPEN_API_KEY = "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"
// const configuration = new Configuration({apikey:OPEN_API_KEY});
// const openai = new OpenAIAPI(configuration);

// export async function sendMsgToOpenAI(message){
//     const res = await openai.createCompletion({
//         model: 'gpt-4o',
//         prompt: message,
//         temperature: 0.7,
//         max_tokens: 256,
//         top_p :1,
//         frequency_penalty: 0,
//         presense_penalty: 0
//     });
//     return res.data.choices[0].text;
// }

// import { Configuration, OpenAIApi } from "openai";

// import OpenAIApi from "openai";
// import Configuration from "openai";

// const configuration = new Configuration({
//   apiKey: "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", // NEVER expose API keys in frontend
// });

// const openai = new OpenAIApi(configuration);

// export async function sendMsgToOpenAI(message: string): Promise<string> {
//   try {
//     const res = await openai.createCompletion({
//       model: "gpt-4o",
//       prompt: message,
//       temperature: 0.7,
//       max_tokens: 256,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });

//     return res.data.choices[0].text || "No response from OpenAI.";
//   } catch (error) {
//     console.error("Error communicating with OpenAI:", error);
//     return "Error processing your request.";
//   }
// }
