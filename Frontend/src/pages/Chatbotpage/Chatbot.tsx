import { useEffect, useRef, useState } from "react";
import sendBtn from "../../Assests/sendBtn.svg";
import { FaUser } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io"; // Import back button icon
import { useLocation, useNavigate } from "react-router-dom";
import { toTitleCase } from "../../utils/transformText.ts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// @ts-ignore
import { sendMsgToOllama } from "./ollama.js";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const title = searchParams.get("title") || "";
  const school = searchParams.get("school") || "";
  const course = searchParams.get("course") || "";

  const [inputText, setInputText] = useState<string>("");
  const courseTopicList: Record<string, string[]> = {
    python: [
      "Syntax and Basics",
      "Data Structures (Lists, Tuples, Dictionaries, Sets)",
      "Object-Oriented Programming (OOP)",
      "Functions and Modules",
      "File Handling",
      "Exception Handling",
      "Decorators and Generators",
      "Multithreading and Concurrency",
      "Database Connectivity (SQLite, PostgreSQL, etc.)",
      "Web Development (Flask, Django)",
      "Data Science and Machine Learning (NumPy, Pandas, Scikit-learn)",
      "Automation and Scripting",
    ],

    java: [
      "Syntax and Basics",
      "OOP Concepts (Encapsulation, Inheritance, Polymorphism, Abstraction)",
      "Collections Framework",
      "Exception Handling",
      "Multithreading",
      "JDBC (Java Database Connectivity)",
      "Spring Boot Framework",
      "Java Servlets and JSP",
      "JavaFX and GUI Development",
      "Data Structures and Algorithms in Java",
    ],

    ai: [
      " Introduction to Artificial Intelligence",
      "Search Algorithms (DFS, BFS, A*, Heuristic Search)",
      "Knowledge Representation and Reasoning",
      "Machine Learning Basics (Supervised, Unsupervised, Reinforcement Learning)",
      "Neural Networks and Deep Learning",
      "Natural Language Processing (NLP)",
      "Computer Vision and Image Processing",
      "Fuzzy Logic and Expert Systems",
      "Bayesian Networks and Probabilistic Models",
      "Reinforcement Learning and Q-Learning",
      "Generative AI (GANs, VAEs, Diffusion Models)",
      "AI Ethics and Responsible AI",
      "AI Model Deployment and Optimization",
      "Evolutionary Algorithms (Genetic Algorithms, Swarm Intelligence)",
      "Speech Recognition and Synthesis",
      "Cognitive Computing and Human-AI Interaction",
      "Robotics and Autonomous Systems",
      "AI in Healthcare, Finance, and Business",
    ],

    ml: [
      "Supervised and Unsupervised Learning",
      "Linear Regression and Logistic Regression",
      "Decision Trees and Random Forest",
      "Support Vector Machines (SVM)",
      "Neural Networks and Deep Learning",
      "Natural Language Processing (NLP)",
      "Feature Engineering",
      "Model Evaluation and Hyperparameter Tuning",
      "Reinforcement Learning",
      "Deployment of ML Models",
    ],

    marketing: [
      "Market Research",
      "Consumer Behavior",
      "Digital Marketing Strategies",
      "SEO and SEM",
      "Content Marketing",
      "Social Media Marketing",
      "Email Marketing",
      "Marketing Analytics",
      "Brand Management",
      "Advertising and Promotions",
    ],

    finance: [
      "Financial Statements and Analysis",
      "Time Value of Money",
      "Investment Strategies",
      "Risk Management",
      "Corporate Finance",
      "Financial Markets and Instruments",
      "Portfolio Management",
      "Behavioral Finance",
      "Derivatives and Hedging",
      "Financial Modeling",
    ],

    accounting: [
      "Financial Accounting Principles",
      "Managerial Accounting",
      "Cost Accounting",
      "Auditing and Assurance",
      "Taxation",
      "Accounting Standards (GAAP, IFRS)",
      "Budgeting and Forecasting",
      "Financial Statement Analysis",
      "Accounting Software (QuickBooks, SAP)",
      "Ethics in Accounting",
    ],

    businesslaw: [
      "Contracts and Agreements",
      "Corporate Law",
      "Intellectual Property Rights",
      "Employment Law",
      "Consumer Protection Laws",
      "Bankruptcy and Insolvency",
      "Business Ethics and Regulations",
      "International Business Law",
      "Taxation Laws",
      "Dispute Resolution and Arbitration",
    ],

    historyofdesign: [
      "Ancient Design Movements",
      "Renaissance and Baroque Design",
      "Industrial Revolution and Design",
      "Modernist Design",
      "Postmodernist Design",
      "Bauhaus Movement",
      "Art Nouveau and Art Deco",
      "Typography Evolution",
      "Digital Age Design",
      "Sustainable and Eco-Friendly Design",
    ],

    historyofart: [
      "Prehistoric Art",
      "Ancient Egyptian and Mesopotamian Art",
      "Greek and Roman Art",
      "Medieval Art",
      "Renaissance Art",
      "Baroque and Rococo Art",
      "Romanticism and Impressionism",
      "Modern and Contemporary Art",
      "Art Movements (Cubism, Surrealism, Dadaism)",
      "Digital and AI-Generated Art",
    ],

    artsanddesign: [
      "Principles of Design",
      "Elements of Art (Line, Shape, Color, Texture, Space)",
      "Graphic Design Basics",
      "Typography and Branding",
      "Illustration Techniques",
      "UI/UX Design",
      "Photography and Visual Storytelling",
      "Motion Graphics and Animation",
      "3D Modeling and Rendering",
      "Design Thinking and Problem-Solving",
    ],

    english: [
      "Grammar and Syntax",
      "Vocabulary Development",
      "Reading Comprehension",
      "Writing and Composition",
      "Literary Analysis",
      "Public Speaking and Communication",
      "Creative Writing",
      "Business and Technical Writing",
      "Phonetics and Pronunciation",
      "English for Academic Purposes",
    ],
  };

  const [messages, setMessages] = useState([
    {
      text: `Hello! I am your ${title} course assistant. I will be assisting you with specific subjects based on the course content taught by your professor. Let me know how I can help!`,
      isBot: true,
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleTopicClick = async (topic: string) => {
    setInputText(topic);
    try {
      const res = await sendMsgToOllama(school, course, topic);
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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Check for Enter key press without Shift
      e.preventDefault(); // Prevent form submission (if inside a form)
      handleSend();
    }
  };

  const handleSend = async () => {
    const inputTextTrimmed = inputText.trim();
    if (inputTextTrimmed == "") return;
    try {
      console.log("Sending messages to OpenAI:", inputTextTrimmed); //check line for function is being called or not.
      const res: string = await sendMsgToOllama(
        school,
        course,
        inputTextTrimmed
      );
      console.log(res);
      setMessages([
        ...messages,
        { text: inputTextTrimmed, isBot: false },
        { text: res, isBot: true },
      ]);
      setInputText(""); //to clear the input field after sending the request.
    } catch (error) {
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
      <div className="sidebar max-w-[420px]">
        <div className="upperSide m-6 flex items-center">
          <IoIosArrowBack
            size={32}
            className="mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="upperSideTop font-workSans font-bold text-2xl">
            Good To See <br></br>You Again!
          </div>
        </div>

        <div className="lowerSide ml-4 p-8 bg-primary  min-h-[85vh] rounded-2xl text-white">
          <div className="lowerSideTop">
            <div className="cousrseText font-workSans font-extrabold pb-16 text-3xl">
              Everything <br /> about {toTitleCase(title)}{" "}
              {/* here we are using title */}
            </div>
          </div>

          <div className="lowerSideBottom">
            <ul className="courseSubTopics text-xl min-h-[28rem] max-h-[32rem] overflow-y-auto custom-scrollbar pr-8">
              {courseTopicList[course]?.map((topic: string, index: number) => (
                <li
                  key={index}
                  className="mb-2 p-1 hover:bg-[#F39CA6] hover:text-black duration-100 rounded cursor-pointer"
                  onClick={() => {
                    handleTopicClick(topic);
                  }}
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
          <div
            ref={chatContainerRef}
            className="chats overflow-hidden overflow-y-scroll scroll-smooth w-full max-w-7xl h-[76vh] custom-scrollbar-1"
          >
            {messages.map((message, i) => (
              <div
                key={i}
                className={`m-4 p-4 font-workSans text-lg flex items-start text-justify w-fit rounded-lg shadow-md
                          ${message.isBot ? "bg-[#F6D8DC]" : ""}`}
              >
                {message.isBot ? (
                  <RiRobot3Line size={32} className="mr-8 flex-shrink-0" />
                ) : (
                  <FaUser size={28} className="mr-8 flex-shrink-0" />
                )}

                <div className="flex-1 markdown-content">
                  {/* <ReactMarkdown>{message.text}</ReactMarkdown> */}
                  {/* <ReactMarkdown>{message.text}</ReactMarkdown>
                  <ReactMarkdown children={message.text} /> */}

                  {/* <MarkdownAsync>{"# Hi, *Pluto*!"}</MarkdownAsync> */}
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                  </Markdown>
                </div>
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
