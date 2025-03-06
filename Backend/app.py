import ollama
from flask import Flask, request, jsonify
from embeddings import store_pdf_embeddings, client, embedding_model

app = Flask(__name__)

@app.route("/query", methods=["POST"])
def query_course_content():
    data = request.json
    school, course, user_query = data.get("school"), data.get("course"), data.get("query")

    if not school or not course or not user_query:
        return jsonify({"error": "Missing required parameters"}), 400

    collection_name = f"{school}_{course}"
    collection = client.get_or_create_collection(name=collection_name)

    query_embedding = embedding_model.encode(user_query).tolist()
    results = collection.query(query_embeddings=[query_embedding], n_results=3)

    retrieved_content = results.get("documents", [[]])[0]
    context = "\n\n".join(retrieved_content) if retrieved_content else "No relevant material found."

    prompt = f"""
    You are an AI assistant for {school}'s {course} course.

    User Question: {user_query}

    Course Reference Material:
    {context}

    Provide a detailed and structured response in the following format:

    1. **Introduction**  
       - Briefly explain the concept related to the user's question.

    2. **Steps to Perform**  
       - List step-by-step instructions, including subpoints if necessary.

    3. **Code Example (if applicable)**  
       - Provide a well-formatted and properly explained code snippet.

    4. **Key Points to Remember**  
       - Summarize important takeaways in bullet points.
    """

    response = ollama.chat(model="llama2", messages=[{"role": "user", "content": prompt}])
    return jsonify({"response": response["message"]["content"]})

if __name__ == "__main__":
    app.run(debug=True)
