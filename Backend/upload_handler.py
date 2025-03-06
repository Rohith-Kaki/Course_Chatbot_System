import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from database import get_db_connection

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"pdf"}

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=["POST"])
def upload_file():
    school = request.form.get("school")
    course = request.form.get("course")
    if not school or not course:
        return jsonify({"error": "School and Course are required"}), 400

    files = request.files.getlist("files")
    if not files:
        return jsonify({"error": "No files uploaded"}), 400

    saved_files = []

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            course_path = os.path.join(app.config["UPLOAD_FOLDER"], school, course)
            os.makedirs(course_path, exist_ok=True)  # Create directories if not exist
            
            file_path = os.path.join(course_path, filename)
            file.save(file_path)
            saved_files.append(file_path)

            # Store file path in database
            conn = get_db_connection()
            conn.execute("INSERT INTO files (school, course, file_path) VALUES (?, ?, ?)", (school, course, file_path))
            conn.commit()
            conn.close()

    return jsonify({"message": "Files uploaded successfully", "files": saved_files}), 200
