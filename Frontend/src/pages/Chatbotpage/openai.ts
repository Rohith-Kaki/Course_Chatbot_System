export async function sendMsgToOpenAI(school:string, course:string, userquery: string): Promise<string> {
  try {
    console.log("Making POST request to backend with userquery:", userquery); // Add this line
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({school:school, course:course, userquery:userquery }),
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