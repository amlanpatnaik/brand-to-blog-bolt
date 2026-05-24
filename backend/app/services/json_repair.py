import json
import re
from typing import Any, Optional

def extract_json(text: str) -> Optional[str]:
    text = text.strip()
    if text.startswith("{") or text.startswith("["):
        return text
    # Try to find JSON block in markdown code fences
    pattern = r"```(?:json)?\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*```"
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return match.group(1)
    # Try to find bare JSON object/array
    match = re.search(r"(\{[\s\S]*\}|\[[\s\S]*\])", text, re.DOTALL)
    if match:
        return match.group(1)
    return None

def repair_and_parse(text: str) -> Any:
    cleaned = extract_json(text)
    if not cleaned:
        raise ValueError(f"No JSON found in response: {text[:200]}")
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # Basic repair: fix trailing commas
        repaired = re.sub(r",\s*([}\]])", r"\1", cleaned)
        try:
            return json.loads(repaired)
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse JSON: {e}. Text: {cleaned[:300]}")
