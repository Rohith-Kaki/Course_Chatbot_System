# from flask import Flask, request, jsonify
# import os
# from flask_cors import CORS
# from dotenv import load_dotenv
# from openai import OpenAI, OpenAIError
# from cerebras.cloud.sdk import Cerebras

# load_dotenv()  # Load API key from .env

# app = Flask(__name__)
# CORS(app)  # Allow frontend to access backend

# # Load API Key from .env (no need to set openai.api_key directly anymore)
# client = Cerebras(api_key=os.getenv("CEREBRAS_API_KEY"))  # Initialize OpenAI client with API key

# @app.route("/chat", methods=["POST"])
# def chat():
#     data = request.get_json()  # Use request.get_json() to parse JSON
#     user_message = data.get("message")

#     if not user_message:
#         return jsonify({"error": "No message provided"}), 400

#     # try:
#     response = client.chat.completions.create(  # Use client.chat.completions
#         model= "llama3.1-8b",  # or whichever model you're using. gpt-4-0613 or gpt-3.5-turbo models are the most up-to-date and recommended.
#         messages=[{"role": "user", "content": user_message}],
#     )
#     print(response)

#         # # Correctly access the response content.  The structure changed with the new OpenAI library.
#         # if response.choices and response.choices[0].message and response.choices[0].message.content:
#         #     return jsonify({"response": response.choices[0].message.content.strip()})  # .strip() to remove whitespace
#         # else:
#         #     return jsonify({"error": "Unexpected response format from OpenAI"}), 500

#     # except OpenAIError as e:  # Catch OpenAI-specific errors
#     #     return jsonify({"error": f"OpenAI Error: {str(e)}"}), 500
#     # except Exception as e:
#     #     return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

# if __name__ == "__main__":
#     app.run(debug=True, port=3000, host="0.0.0.0")  # host="0.0.0.0" makes server accessible externally



from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras  # Make sure you have this installed

load_dotenv()

app = Flask(__name__)
CORS(app)

# base_url = os.environ.get("TEST_API_BASE_URL", "http://10.108.25.126:3000")
cerebras_api_key = os.getenv("CEREBRAS_API_KEY") # Correct environment variable name
client = Cerebras(api_key=cerebras_api_key) # Correct Cerebras initialization

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = client.chat.completions.create(
            model="llama3.1-8b",  # Or your model name
            messages=[{"role": "user", "content": user_message}],
        )
        print(response)

        # ***CRITICAL: Consult Cerebras documentation for the correct way to extract the generated text from the response***
        # This is a placeholder - replace with the actual code
        generated_text = response.choices[0].message.content  # Or response['choices'][0]['message']['content'] or whatever the actual path is.

        if generated_text: # Check if generated_text isn't None or empty
            return jsonify({"response": generated_text})  # Return the text
        else:
            return jsonify({"error": "Could not extract generated text from response."}), 500

    except Exception as e: # Catch any error
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500  # Return the error

if __name__ == "__main__":
    app.run(debug=True, port=5173, host="0.0.0.0")