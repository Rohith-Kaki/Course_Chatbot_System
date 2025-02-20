import { useEffect, useRef, useState } from "react";
import sendBtn from "../../Assests/sendBtn.svg";
import { FaUser } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io"; // Import back button icon
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { sendMsgToOpenAI } from "./openai.js";

function App() {
  const navigate = useNavigate(); 
  const [inputText, setInputText] = useState<string>("");
  const [topics] = useState([
    "What is Python?",
    "Python Data Types",
    "Operators in Python",
    "Loops in Python",
    "Functions in Python",
    "Modules and Packages",
    "Object-Oriented Programming",
    "Error Handling",
    "File Handling",
    "Python Libraries",
    "Database Connectivity",
    "Web Scraping",
    "Tensorflow",
    "What is Python?",
    "Python Data Types",
    "Operators in Python",
    "Loops in Python",
    "Functions in Python",
    "Modules and Packages",
    "Object-Oriented Programming",
    "Error Handling",
    "File Handling",
    "Python Libraries",
    "Database Connectivity",
    "Web Scraping",
    "Tensorflow",
  ]);

  const [messages, setMessages] = useState([
    {
      text: "Hello! I am your course assistant. I will be assisting you with specific subjects based on the course content taught by your professor. Let me know how I can help!",
      isBot: true,
    },
  ]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleTopicClick = async (topic: string) => {
    setInputText(topic);
    try {
      const res = await sendMsgToOpenAI(topic);
      setMessages([
        ...messages,
        { text: topic, isBot: false },
        { text: res, isBot: true },
      ]);
      setInputText(""); // Clear input after sending
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...messages,
        { text: topic, isBot: false },
        { text: "Error fetching response.", isBot: true },
      ]);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
}

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {  // Check for Enter key press without Shift
      e.preventDefault(); // Prevent form submission (if inside a form)
      handleSend();
    }
  };

  const handleSend = async () => {
    const inputTextTrimmed = inputText.trim();
    if(inputTextTrimmed == "") return ;
    try{
      console.log("Sending messages to OpenAI:", inputTextTrimmed); //check line for function is being called or not.
      const res: string = await sendMsgToOpenAI(inputTextTrimmed);
      console.log(res);
      setMessages([
        ...messages,
        {text:inputTextTrimmed,isBot:false},
        {text:res,isBot:true}
      ]);
      setInputText(""); //to clear the input field after sending the request.
    }
    catch(error){
      console.error("Error fetching response:", error);
      setMessages([
        ...messages,
        { text: inputTextTrimmed, isBot: false },
        { text: "Error fetching response.", isBot: true },
      ]);
    }
  };

  return (
    <div className="App min-h-screen flex bg-[#F39CA6]">
      <div className="sidebar flex-3">
        <div className="upperSide m-6 flex items-center">
          <IoIosArrowBack size={32} className="mr-4 cursor-pointer" onClick={() => navigate(-1)} />
          <div className="upperSideTop font-workSans font-bold text-2xl">
            Good To See <br></br>You Again!
          </div>
        </div>

        <div className="lowerSide ml-4 p-8 bg-primary min-h-[85vh] rounded-2xl text-white">
          <div className="lowerSideTop">
            <div className="cousrseText font-workSans font-extrabold pb-16 text-3xl">
              Everything <br /> about Python
            </div>
          </div>

          <div className="lowerSideBottom">
            <ul className="courseSubTopics text-xl min-h-[28rem] max-h-[32rem] overflow-y-auto custom-scrollbar pr-8">
              {topics.map((topic, index) => (
                <li
                  key={index}
                  className="mb-2 p-1 hover:bg-[#F39CA6] hover:text-black duration-100 rounded cursor-pointer"
                  onClick={() => {handleTopicClick(topic)}}
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="main flex-7 bg-white rounded-xl m-6 p-12 flex flex-col min-h-[85vh]">
        <div className="chatsection pr-20 pl-20 flex flex-1 flex-col">
          <div ref={chatContainerRef} className="chats overflow-hidden overflow-y-scroll scroll-smooth w-full max-w-7xl h-[76vh] custom-scrollbar-1">
            {messages.map((message, i) => (
                          <div key={i} className={`m-4 p-4 font-workSans text-lg flex items-start text-justify w-fit rounded-lg shadow-md
                          ${message.isBot? "bg-[#F6D8DC]": ""}`}>
                          {message.isBot? (<RiRobot3Line size={32} className="mr-8 flex-shrink-0"  />):(<FaUser size={28} className="mr-8 flex-shrink-0" />)}
                          <p className="flex-1">
                            {message.text}
                          </p>
                        </div>
            ))}
          </div>
          <div className="chatFooter flex flex-col items-center mt-auto w-full">
            <div className="inp p-3 bg-[#F39CA6] flex items-center justify-between w-[75%] rounded-xl">
              <input
                type="text"
                value={inputText}
                name="userquery"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Send a messages"
                aria-label="Send a messages"
                className="bg-transparent border-none focus:outline-none text-xl flex-1 placeholder-black"
              ></input>
              <button onClick={handleSend}>
                <img src={sendBtn} alt="sendBtn" className="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
