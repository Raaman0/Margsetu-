from huggingface_hub import InferenceClient
import os

# Make sure your token is set here

# Create client
client = InferenceClient(
 model="tiiuae/falcon-7b-instruct",
token=os.getenv("HUGGINGFACE_TOKEN")
)

# Generate simple response
prompt = "What is Hugging Face?"
response = client.text_generation(prompt, max_new_tokens=50)
print(response)
