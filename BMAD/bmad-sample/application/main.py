import json
import os
from pathlib import Path
from openai import OpenAI

api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("OPENAI_API_KEY must be set in the environment")

client = OpenAI(api_key=api_key)

# Load FAQ
base_dir = Path(__file__).resolve().parent
faq_path = base_dir.parent / "model" / "faq.json"
with open(faq_path, "r", encoding="utf-8") as f:
    faq = json.load(f)

def get_faq_answer(query):
    return faq.get(query.lower())

def ask_llm(query):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant"},
            {"role": "user", "content": query}
        ]
    )
    return response.choices[0].message.content

def main():
    while True:
        query = input("Ask: ")

        answer = get_faq_answer(query)

        if answer:
            print("FAQ:", answer)
        else:
            print("LLM:", ask_llm(query))

if __name__ == "__main__":
    main()