import ollama
import json


def generate_course(text: str):

    prompt = f"""
You are an expert educational course designer.

Transform the following educational material into a structured course.

Create:
- A clear course title
- A short course description
- 3 to 5 modules
- 2 to 4 lessons per module
- 2 to 4 learning objectives for each lesson

Keep the content faithful to the provided material.
Do not invent topics that are not supported by the material.

Return ONLY valid JSON in this exact structure:

{{
    "course_title": "Course title",
    "description": "Short description",
    "modules": [
        {{
            "title": "Module title",
            "lessons": [
                {{
                    "title": "Lesson title",
                    "learning_objectives": [
                        "Objective 1",
                        "Objective 2"
                    ]
                }}
            ]
        }}
    ]
}}

Educational material:

{text}
"""

    response = ollama.chat(
        model="llama3.2:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    result = response["message"]["content"]

    # Remove markdown code fences if the model adds them
    result = result.replace("```json", "").replace("```", "").strip()

    return json.loads(result)