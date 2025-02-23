import chromadb
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer
import nltk
nltk.download("punkt")
from nltk.tokenize import sent_tokenize

# Initialize ChromaDB (Persistent Storage)
client = chromadb.PersistentClient(path="chroma_db/")

# Create collections for each course inside a school
schools = {"School_of_technology":["Python","Java","AI","ML"],"School_of_business":["Marketing","Accounts"],"School_of_law":["History_law"],"School_of_design":["Design_history"]}
for school, courses in schools.items():
    for course in courses:
        collection_name = f"{school}_{course}"
        client.get_or_create_collection(name=collection_name)


print("✅ School and Course collections created!")

print(len(client.list_collections()))
print(client.list_collections())



# Load the embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"  # Extract text from each page
    return text

# def split_text_into_chunks(text, chunk_size=500, overlap=50):
#     """
#     Splits long text (books) into fixed-size chunks with overlap.

#     :param text: Extracted text from PDF
#     :param chunk_size: Number of characters per chunk
#     :param overlap: Overlapping characters between consecutive chunks (to maintain context)
#     :return: List of text chunks
#     """
#     words = text.split()
#     chunks = []
    
#     for i in range(0, len(words), chunk_size - overlap):
#         chunk = " ".join(words[i:i + chunk_size])
#         chunks.append(chunk)

#     return chunks


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


def store_pdf_embeddings(school, course, pdf_paths):
    """
    Convert book PDFs to embeddings & store in ChromaDB.

    :param school: School name
    :param course: Course name
    :param pdf_paths: List of PDF file paths
    """
    collection_name = f"{school}_{course}"
    collection = client.get_or_create_collection(name=collection_name)

    for pdf_path in pdf_paths:
        print(f"🔄 Processing {pdf_path}...")

        text = extract_text_from_pdf(pdf_path)
        chunks = split_text_into_chunks(text, chunk_size=500, overlap=50)
        embeddings = embedding_model.encode(chunks).tolist()  # Generate vector embeddings

        for i, chunk in enumerate(chunks):
            collection.add(
                ids=[f"{collection_name}_{pdf_path}_{i}"],  # Unique ID
                documents=[chunk],  # Store text chunk
                embeddings=[embeddings[i]]  # Store vector embeddings
            )

        print(f"✅ {pdf_path} embeddings added to {collection_name} in ChromaDB.")

# Example Usage: Storing book PDFs
store_pdf_embeddings(
    "School_of_technology",
    "Python",
    ["R:/CourseChabot/Backend/new/Books/school_tech_books/Learning_Python_part_1.pdf", "R:/CourseChabot/Backend/new/Books/school_tech_books/Learning_Python_part_2.pdf"]
)

# store_pdf_embeddings(
#     "School_of_business",
#     "Marketing",
#     ["marketing_strategy.pdf", "digital_marketing_book.pdf"]
# )

