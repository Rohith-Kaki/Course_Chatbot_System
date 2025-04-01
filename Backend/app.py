import os
import ollama # type: ignore
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from database import get_db_connection
from embeddings import store_pdf_embeddings, client, embedding_model

app = Flask(__name__)
CORS(app)


#handling uploads 
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"pdf"}

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
CORS(app)

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=["POST"])
def upload_file():
    school = request.form.get("school")
    course = request.form.get("course")
    if not school or not course:
        return jsonify({"error": "School and Course are required"}), 400

    files = request.files.getlist("files")

    print(f'FILES {files}')

    if not files:
        return jsonify({"error": "No files uploaded"}), 400

    saved_files = []
    conn = get_db_connection()  # Single connection
    cursor = conn.cursor()

    try:
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                course_path = os.path.join(app.config["UPLOAD_FOLDER"], school, course)
                os.makedirs(course_path, exist_ok=True)  # Create directories if not exist
                
                file_path = os.path.join(course_path, filename)
                file.save(file_path)
                saved_files.append(file_path)

                # Store file path in database
                # conn = get_db_connection()
                conn.execute("INSERT INTO files (school, course, filename, file_path) VALUES (?, ?, ?, ?)", (school, course, filename, file_path))
        conn.commit()
        print("Files saved and database updated successfully.")
    except Exception as e:
        conn.rollback()
        print(f"Error saving files: {str(e)}")
        return jsonify({"error": f"Failed to save files: {str(e)}"}), 500   
    finally:
            conn.close()

    try:
        print("Starting embedding process...")
        store_pdf_embeddings()  #Once files are uploaded this will store all the embeddings in the chromadb  by calling the function
        print("Embedding process completed.")
        return jsonify({"message": "Files uploaded successfully", "files": saved_files}), 200
    except Exception as e:
        print(f"Error in store_pdf_embeddings: {str(e)}")
        return jsonify({"error": f"Failed to process embeddings: {str(e)}"}), 500

# list of courses that require a code. To change the prompt template dynamically....
tech_courses = {"python", "ai", "java", "ml"}
@app.route("/query", methods=["POST"])
def query_course_content():
    data = request.json
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
    school, course, user_query = data.get("school"), data.get("course"), data.get("userquery")

    if not school or not course or not user_query:
        return jsonify({"error": "Missing required parameters: School or course or query"}), 400

    collection_name = f"{school}_{course}"
    try:
      collection = client.get_or_create_collection(name=collection_name)
    except Exception as e:
      return jsonify({"error": f"Failed to access collection: {str(e)}"}), 500
    try:
     query_embedding = embedding_model.encode(user_query).tolist()
     results = collection.query(query_embeddings=[query_embedding], n_results=3)
    except Exception as e:
        return jsonify({"error": f"Failed to generate embeddings or query collection: {str(e)}"}), 500

    retrieved_content = results.get("documents", [[]])[0]
    context = "\n\n".join(retrieved_content) if retrieved_content else "No relevant material found."

    is_tech_course = course.lower() in tech_courses

    if is_tech_course:
        prompt = f"""
        You are an AI assistant for {school}'s {course} course.

        User Question: {user_query}

        Course Reference Material:
        {context}

        Provide a detailed and structured response in the following format:

        **1. Introduction**  
        - Briefly explain the concept related to the user's question.

        **2. Steps to Perform**  
        - List step-by-step instructions, including subpoints if necessary.

        **3. Code Example**
        ```python
            # Ensure the code is enclosed in backticks
            # The model will generate this section dynamically

        **4. Key Points to Remember**  
        - Summarize important takeaways in bullet points.
        """
    else:
        prompt = f"""
        You are an AI assistant for {school}'s {course} course.

        User Question: {user_query}

        Course Reference Material:
        {context}

        Provide a detailed and structured response in the following markdown format:

        **1. Introduction**  
        - Briefly explain the concept related to the user's question.

        **2. Steps to Perform**  
        - List step-by-step instructions, including subpoints if necessary.

        **3. Key Points to Remember**  
        - Summarize important takeaways in bullet points.
        """

    try:
        response = ollama.chat(model="llama2", messages=[{"role": "user", "content": prompt}])
        return jsonify({"response": response["message"]["content"]})
    except Exception as e:
        return jsonify({"error": f"Failed to generate response from model: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
