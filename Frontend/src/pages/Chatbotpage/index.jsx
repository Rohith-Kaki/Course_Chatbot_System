import React, { useState } from 'react';
import sendBtn from "../../Assests/sendBtn.svg"
import { FaUser } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";


function App() {
  // const [inputText, setInputText] = useState("");
  // const [topics] = useState([
  //   "What is Python?",
  //   "Python Data Types",
  //   "Operators in Python",
  //   "Loops in Python",
  //   "Functions in Python",
  //   "Modules and Packages",
  //   "Object-Oriented Programming",
  //   "Error Handling",
  //   "File Handling",
  //   "Python Libraries",
  //   "Database Connectivity",
  //   "Web Scraping",
  //   "Tensorflow",
  //   "What is Python?",
  //   "Python Data Types",
  //   "Operators in Python",
  //   "Loops in Python",
  //   "Functions in Python",
  //   "Modules and Packages",
  //   "Object-Oriented Programming",
  //   "Error Handling",
  //   "File Handling",
  //   "Python Libraries",
  //   "Database Connectivity",
  //   "Web Scraping",
  //   "Tensorflow"
  // ])
  return (
    <div className="App min-h-screen flex bg-[#F39CA6]">
      <div className="sidebar flex-3">
        <div className="upperSide m-6">
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
              <li className="mb-2">What is Python?</li>
              <li className="mb-2">Python Data Types</li>
              <li className="mb-2">Operators in Python</li>
              <li className="mb-2">Loops in Python</li>
              <li className="mb-2">What is Python?</li>
              <li className="mb-2">Python Data Types</li>
              <li className="mb-2">Operators in Python</li>
              <li className="mb-2">Loops in Python</li>
              <li className="mb-2">Functions in Python</li>
              <li className="mb-2">What is Python?</li>
              <li className="mb-2">Python Data Types</li>
              <li className="mb-2">Operators in Python</li>
              <li className="mb-2">Loops in Python</li>
              <li className="mb-2">Functions in Python</li>
              <li className="mb-2">Modules and Packages</li>
              <li className="mb-2">Object-Oriented Programming</li>
              <li className="mb-2">Error Handling</li>
              <li className="mb-2">File Handling</li>
              <li className="mb-2">Python Libraries</li>
              <li className="mb-2">Database Connectivity</li>
              <li className="mb-2">Web Scraping</li>
              <li className="mb-2">Tensorflow</li>
              {/* {topics.map((topic,index) => (
                <li  key={index} className='mb-2 hover:bg-gray-800 rounded cursor-pointer'>
                  {topic}
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>

      <div className="main flex-7 bg-white rounded-xl m-6 p-12 flex flex-col min-h-[85vh]">     
        <div className="chatsectioon pr-20 pl-20 flex flex-1 flex-col">
          <div className="chats  overflow-hidden overflow-y-scroll scroll-smooth w-full max-w-7xl h-[76vh] custom-scrollbar-1">  
            <div className="m-4 p-4 font-workSans text-lg flex items-start text-justify">
              <FaUser size={28} className="mr-8 flex-shrink-0"/>
              <p className="flex-1">Lorem  ipsum dolor sit amet  lorem consectetur adipisicing elit. Ipsa provident, nam debitis officiis, magni animi temporibus nihil repellendus sint quam nobis at! Magni numquam iure voluptates ea et doloribus facilis?</p>
            </div>
            <div className="m-4 p-4 font-workSans text-lg flex items-start text-justify bg-[#F6D8DC] w-fit">
              <RiRobot3Line size={32} className="mr-8 flex-shrink-0"/>
              <p className="flex-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa provident, nam debitis officiis, magni animi temporibus nihil repellendus sint quam nobis at! Magni numquam iure voluptates ea et doloribus facilis?  </p>
            </div>
          </div>
          <div className="chatFooter flex flex-col items-center mt-auto w-full ">
            <div className="inp p-3 bg-[#F39CA6] flex items-center justify-between w-[75%] rounded-xl">
              <input type="text" name="" id="" placeholder="Send a message" aria-label="Send a message" className="bg-transparent border-none focus:outline-none placeholder-black"></input>
              <button><img src={sendBtn} alt="sendBtn"/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
