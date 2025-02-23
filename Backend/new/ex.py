# schools = {"School_of_technology":["Python","Java","AI","ML"],"School_of_business":["Marketing","Accounts"],"School_of_law":["Histroy_law"],"School_of_design":[]}
# for key,values in schools.items():
#     for value in values:
#         collection = f"{key}_{value}"
#         print(collection)


from PyPDF2 import PdfReader

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"  # Extract text from each page
    return text

pdf_path = "R:/CourseChabot/Backend/new/Books/school_tech_books/Learning_Python_part_1.pdf"
text = extract_text_from_pdf(pdf_path)
print(len(text))
