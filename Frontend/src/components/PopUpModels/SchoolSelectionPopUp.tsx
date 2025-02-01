import React, { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";

interface SchoolsListProps {
  onClose: () => void;
}

const SchoolsList: React.FC<SchoolsListProps> = ({ onClose }) => {
  const schoolSelectorRef = useRef<HTMLDivElement>(null);

  const closeSchoolSelector = (e: React.MouseEvent<HTMLDivElement>) => {
    if (schoolSelectorRef.current && schoolSelectorRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      onClick={closeSchoolSelector}
      ref={schoolSelectorRef}
      className="z-20 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center"
    >
      <div className="mt-20 flex flex-col gap-5">
        <button
          onClick={onClose}
          className="place-self-end hover:font-extrabold hover:scale-110"
        >
          <AiOutlineClose size={30} style={{ color: "#000000" }} />
        </button>
        <ul className="bg-white px-16 py-10 rounded-3xl drop-shadow-2xl gap-4 flex flex-col flex-wrap">
          {/* Technology */}
          <li className="group flex flex-row hover:translate-x-3 hover-scale-[1.02] gap-1 duration-300 items-center">
            <div className="text-primary group-hover:text-black">
              <FiChevronRight size={20} />
            </div>
            <a
              href="#Technology"
              className="text-options group-hover:text-primary text-lg font-semibold font-workSans"
            >
              Technology
            </a>
          </li>
          {/* Business */}
          <li className="group flex flex-row hover:translate-x-3 hover-scale-[1.02] gap-1 duration-300 items-center">
            <div className="text-primary group-hover:text-black">
              <FiChevronRight size={20} />
            </div>
            <a
              href="#Business"
              className="text-options group-hover:text-primary text-lg font-semibold font-workSans"
            >
              Business
            </a>
          </li>
          {/* Arts & Design */}
          <li className="group flex flex-row hover:translate-x-3 hover-scale-[1.02] gap-1 duration-300 items-center">
            <div className="text-primary group-hover:text-black">
              <FiChevronRight size={20} />
            </div>
            <a
              href="#Arts & Design"
              className="text-options group-hover:text-primary text-lg font-semibold font-workSans"
            >
              Arts & Design
            </a>
          </li>
          {/* Architecture & Planning */}
          <li className="group flex flex-row hover:translate-x-3 hover-scale-[1.02] gap-1 duration-300 items-center">
            <div className="text-primary group-hover:text-black">
              <FiChevronRight size={20} />
            </div>
            <a
              href="#Architecture & Planning"
              className="text-options group-hover:text-primary text-lg font-semibold font-workSans"
            >
              Architecture & Planning
            </a>
          </li>
          {/* Liberal Arts & Humanities */}
          <li className="group flex flex-row hover:translate-x-3 hover-scale-[1.02] gap-1 duration-300 items-center">
            <div className="text-primary group-hover:text-black">
              <FiChevronRight size={20} />
            </div>
            <a
              href="#Liberal Arts & Humanities"
              className="text-options group-hover:text-primary text-lg font-semibold font-workSans"
            >
              Liberal Arts & Humanities
            </a>
          </li>
          {/* Law */}
          <li className="group flex flex-row hover:translate-x-3 hover-scale-[1.02] gap-1 duration-300 items-center">
            <div className="text-primary group-hover:text-black">
              <FiChevronRight size={20} />
            </div>
            <a
              href="#Law"
              className="text-options group-hover:text-primary text-lg font-semibold font-workSans"
            >
              Law
            </a>
          </li>
          {/* Sciences */}
          <li className="group flex flex-row hover:translate-x-3 hover-scale-[1.02] gap-1 duration-300 items-center">
            <div className="text-primary group-hover:text-black">
              <FiChevronRight size={20} />
            </div>
            <a
              href="#Sciences"
              className="text-options group-hover:text-primary text-lg font-semibold font-workSans"
            >
              Sciences
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SchoolsList;
