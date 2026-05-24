import asyncio
import google.generativeai as genai

class GeminiProvider:
    def __init__(self, api_key: str, model: str = "gemini-2.0-flash"):
        genai.configure(api_key=api_key)
        self.model_name = model
        self.model = genai.GenerativeModel(model)

    async def generate(self, prompt: str, expect_json: bool = True) -> str:
        config_kwargs = {"temperature": 0.7, "max_output_tokens": 8192}
        if expect_json:
            config_kwargs["response_mime_type"] = "application/json"
        generation_config = genai.types.GenerationConfig(**config_kwargs)

        def _call():
            return self.model.generate_content(prompt, generation_config=generation_config)

        # Gemini SDK is synchronous; run in thread to avoid blocking the event loop
        response = await asyncio.to_thread(_call)
        return response.text

    @property
    def provider_name(self) -> str:
        return "gemini"
