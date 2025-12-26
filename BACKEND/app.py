from flask import Flask, request, jsonify
from openai import OpenAI
import json
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()
@app.route('/openai', methods = ['POST'])
def useChat():
  medications = request.get_json()
  try:
    client = OpenAI(
      api_key= os.getenv("OPENAI_API_KEY")
    )

    response = client.responses.create(
      model="gpt-5",
      input=[
          {
              "role": "developer",
              "content": "You are a clinical drug information assistant. Generate accurate, evidence-based pairwise drug interaction reports."
          },
          {
              "role": "user",
              "content": f"""
    Generate a pairwise drug interaction report for the following medications:

    {medications}

    Requirements:
    1. Categorize interactions as Major, Moderate, Minor, or None.
    2. Explain the interaction in **simple, non-technical language** suitable for the average adult user.
    3. Include practical advice in plain language (what to watch for, what to avoid, basic precautions).
    4. Consult sources for accuracy (Drugs.com, FDA labels, MedlinePlus).
    5. Output in JSON format with keys:
      - drug1
      - drug2
      - interaction_level (Major, Moderate, Minor, None)
      - simple_explanation:
        Provide ONE short, patient-friendly bullet (max 30 words). 
        Must include:
        - the safety message (interaction risk)
        - acceptable dose guidance if relevant
        Keep tone reassuring but factual. 
        No redundant phrases like “at usual doses this is generally okay.” 
      - of the previous things, do NOT include minor things or anything too general, if there are only such things, simply state "Your drugs do not have harmful interactions!"
    """
          },
      ], 
      store=False
    )
    return response.output_text
  except Exception as e:
     return str(e), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
#print(useChat());
