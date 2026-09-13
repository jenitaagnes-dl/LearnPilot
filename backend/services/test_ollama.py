import ollama

response = ollama.chat(
    model="llama3.2:3b",
    messages=[
        {
            "role": "user",
            "content": "Explain process management in an operating system in 3 simple points."
        }
    ]
)

print(response["message"]["content"])