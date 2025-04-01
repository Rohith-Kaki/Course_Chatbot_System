// export async function sendMsgToOpenAI(school:string, course:string, userquery: string): Promise<string> {
//   try {
//     console.log("Making POST request to backend with userquery:", userquery); // Add this line
//     const response = await fetch("http://127.0.0.1:4000/query", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({school:school, course:course, userquery:userquery }),
//     });

//     if (response.status === 429) {
//       return "Rate limit exceeded. Try again later.";
//     }

//     const data = await response.json();
//     return data.response || "Error processing request.";
//   } catch (error) {
//     console.error("Error communicating with backend:", error);
//     return "Server error. Try again later.";
//   }
// }

export async function sendMsgToOllama(school, course, userquery) {
  try {
    console.log("Making POST request to backend with query:", userquery);
    const response = await fetch("http://127.0.0.1:5000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ school, course, userquery }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        return `Bad request: ${errorData.error || "Invalid input"}`;
      } else if (response.status === 429) {
        return "Rate limit exceeded. Please try again later.";
      } else if (response.status === 500) {
        const errorData = await response.json();
        return `Server error: ${errorData.error || "Unknown issue"}`;
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "Error processing request.";
  } catch (error) {
    console.error("Error communicating with backend:", error);
    return `Failed to connect to the server: ${error.message}. Please try again later.`;
  }
}