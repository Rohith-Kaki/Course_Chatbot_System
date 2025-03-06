import chromadb
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer
from nltk.tokenize import sent_tokenize
from database import get_db_connection

client = chromadb.PersistentClient(path="chroma_db/")
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


# Create collections for each course inside a school
schools = {"School_of_technology":["Python","Java","AI","ML"],"School_of_business":["Marketing","Accounts"],"School_of_law":["History_law"],"School_of_design":["Design_history"]}
for school, courses in schools.items():
    for course in courses:
        collection_name = f"{school}_{course}"
        client.get_or_create_collection(name=collection_name)


print("School and Course collections created!")

print(len(client.list_collections()))
print(client.list_collections())


def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"  # Extract text from each page
    return text


def split_text_into_chunks(text, max_tokens=100):
    sentences = sent_tokenize(text)  # Split into sentences
    chunks = []
    current_chunk = ""

    for sentence in sentences:
        if len(current_chunk) + len(sentence) <= max_tokens:
            current_chunk += " " + sentence
        else:
            chunks.append(current_chunk.strip())
            current_chunk = sentence  # Start new chunk

    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks


def store_pdf_embeddings():
    conn = get_db_connection()
    cursor = conn.execute("SELECT school, course, file_path FROM files")
    records = cursor.fetchall()
    conn.close()

    collection_name = f"{school}_{course}"
    collection = client.get_or_create_collection(name=collection_name)

    for record  in records:
        school, course, file_path = record["school"], record["course"], record["file_path"]
        collection_name = f"{school}_{course}"
        collection = client.get_or_create_collection(name=collection_name)
        print(f"Processing {file_path}...")

        text = extract_text_from_pdf(file_path)
        chunks = split_text_into_chunks(text, max_tokens=100)
        embeddings = embedding_model.encode(chunks).tolist()  # Generate vector embeddings

        for i, chunk in enumerate(chunks):
            collection.add(
                ids=[f"{collection_name}_{file_path}_{i}"],  # Unique ID
                documents=[chunk],  # Store text chunk
                embeddings=[embeddings[i]]  # Store vector embeddings
            )

        print(f"{file_path} embeddings added to {collection_name} in ChromaDB.")

