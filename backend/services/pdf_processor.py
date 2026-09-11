import fitz


def extract_text_from_pdf(file_path: str) -> str:
    document = fitz.open(file_path)

    text = ""

    for page_number, page in enumerate(document):
        page_text = page.get_text()

        text += f"\n--- Page {page_number + 1} ---\n"
        text += page_text

    document.close()

    return text