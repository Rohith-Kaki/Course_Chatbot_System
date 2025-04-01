import { useState, ChangeEvent, FormEvent } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import bg from "../../Assests/adminpage_bg_image.png";
import axios from "axios";

type EducationData = {
  [school: string]: {
    specializations: {
      [specialization: string]: string;
    };
  };
};
// Dummy data for schools and courses
const educationData: EducationData = {
  school_of_technology: {
    specializations: {
      python: "Python",
      java: "Java",
      ai: "Artificial Intelligence",
      ml: "Machine Learning",
    },
  },
  school_of_business: {
    specializations: {
      marketing: "Marketing",
      accounting: "Accounting",
      finance: "Finance",
      businesslaw: "Business Law",
    },
  },
  school_of_artsdesign: {
    specializations: {
      historyofdesign: "History of Design",
      historyofart: "History of Art",
      english: "English",
      artsanddesign: "Arts & Design",
    },
  },
};

const AdminPage = () => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState(""); // To display the course name
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Handle school selection
  const handleSchoolChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool(e.target.value);
    setSelectedCourse(""); // Reset course when school changes
    setSelectedCourseName(""); // Reset course name
    setFiles(null); // Reset files
  };

  // Handle course selection
  const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const courseKey = e.target.value;
    const courseName =
      educationData[selectedSchool as keyof typeof educationData]
        .specializations[courseKey];
    setSelectedCourse(courseKey); // Store the key
    setSelectedCourseName(courseName); // Store the display name
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  // Handle form submission (file upload)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedSchool || !selectedCourse || !files) {
      setUploadStatus(
        "Please select a school, a course, and upload at least one file."
      );
      return;
    }

    setLoading(true); // Start loading animation

    const formData = new FormData();
    formData.append("school", selectedSchool);
    formData.append("course", selectedCourse);

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUploadStatus(response.data.message);
      setFiles(null); // Reset files after successful upload
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Failed to upload files. Please try again.");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Function to format school name
  const formatSchoolName = (school: string) => {
    return school.replace(/_/g, " ").replace(/of/g, "of ");
  };

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-no-repeat overflow-hidden flex flex-col items-center justify-center bg-[#F39CA6] py-12 px-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold font-workSans text-gray-900 text-center">
          Upload Course Material
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* School Selection */}
          <div>
            <label
              htmlFor="school"
              className="block text-xl font-medium text-gray-700"
            >
              Select School
            </label>
            <select
              id="school"
              value={selectedSchool}
              onChange={handleSchoolChange}
              className="mt-1 block w-full rounded-md shadow-sm bg-white py-2 px-3 border"
              required
            >
              <option value="">Select a school</option>
              {Object.keys(educationData).map((school) => (
                <option key={school} value={school}>
                  {formatSchoolName(school)}
                </option>
              ))}
            </select>
          </div>

          {/* Course Selection */}
          {selectedSchool && (
            <div>
              <label
                htmlFor="course"
                className="block text-xl font-medium text-gray-700"
              >
                Select Course
              </label>
              <select
                id="course"
                value={selectedCourse}
                onChange={handleCourseChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white py-2 px-3 border"
                required
              >
                <option value="">Select a course</option>
                {Object.entries(
                  educationData[selectedSchool as keyof typeof educationData]
                    .specializations
                ).map(([key, name]) => (
                  <option key={key} value={key}>
                    {" "}
                    {/*The value = key the key is the names that we use in the back*/}
                    {name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* File Upload Section */}
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Upload PDFs
            </label>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              className="mt-2 w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center place-content-evenly py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-bold text-white bg-primary focus:outline-none hover:bg-[#ca4151]"
          >
            Upload
            <MdOutlineFileUpload width={14} />
          </button>

          {/* Loading Animation */}
          {loading && (
            <div className="flex items-center justify-center mt-4">
              <div className="h-8 w-8 border-4 border-t-4 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}

          {/* Upload Status */}
          {uploadStatus && !loading && (
            <div className="mt-4">
              <p className="text-green-500 text-center">{uploadStatus}</p>
              {files && (
                <ul className="mt-2">
                  {Array.from(files).map((file, index) => (
                    <li key={index} className="text-gray-700">
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
