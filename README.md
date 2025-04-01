# AI Based Chatbot System For Course Management

* It's an educational tool designed to bridge the gap between students at different schools and courses.
* The chatbot integration to provide topic explanations and answer course-related queries based on admin-uploaded materials. 

## Quick Start
1. Fork this repository.
    * Clone or fork this repository to your local machine.
2. Set up a virtual environment.

	```bash
	python -m venv venv
	source venv/bin/activate #on Windows
	```
3. Install dependencies
	```bash
	pip install -r requirements.txt
	```
4. Navigate to Frontend
	```bash
	npm install
	```
5. Start the React App
	```bash
	npm run dev
	```
* The frontend runs on http://localhost:5173
6. Navigate to Backend
* run the database.py code.
	```bash
	python database.py
	```
* This will create database.db file in the current directory.
7. Install `llama2` in your system and keep it running in the command prompt.
	```bash
	ollama run llama2
	```
8.Run the Flask App
	```bash
	 python app.py
	```
* The backend runs on http://127.0.0.1:5000.

9. Visit `http://localhost:5173` and explore the course by clicking on the course cards. This will navigate you to particular chatbot page and Start Learning !!!!


### How upload course content/materials ?
1. Visit `http://localhost:5173` and click the `Admin  button` on the navbar.
2. Use the login credentials:
    * Email: admin@woxsen.edu.in
    * Password: admin123
3. Upload Files
    * Select a school and course from the drop downs.
    * Upload one or more PDF's.
    * Files are saved to `uploads/school/course/` and embeddings are stored in `ChromaDB`.

### How make an interactive chat once the content is uploaded ?
* Once the content is uploaded under a particular a school and course
1. Click that course card on the homepage (e.g. Python).
2. Enter a `question` or Choose it from the `Side Menu`.
3. The chatbot provides a structured answer based on uploaded materials.

## API Endpoints

`POST /upload`
* Description: Uploads PDFs and stores their embeddings.
* Request:
    * Form Data:
        * school: String (e.g., school_of_technology)
        * course: String (e.g., python)
        * files: Multipart files (PDFs)
* Response:
    * Success: 200 - {"message": "Files uploaded and embeddings stored successfully", "files": [...]}
    * Error: 400/500 - {"error": "message"}

`POST /query`
* Description: Queries course content via the chatbot.
* Request:
    * JSON Body:
      ```json
        {
          "school": "school_of_technology",
          "course": "python",
          "userquery": "How do I write a Python loop?"
        }
      ```
* Response:
    * Success: 200 - {"response": "markdown formatted answer"}
    * Error: 400/500 - {"error": "message"}


