import re
from urllib.parse import urlparse, urlunparse
from app.core.security import validate_url

def normalize_url(url: str) -> str:
    url = url.strip()
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
    parsed = urlparse(url)
    normalized = urlunparse((
        parsed.scheme,
        parsed.netloc.lower(),
        parsed.path or "/",
        parsed.params,
        parsed.query,
        ""
    ))
    validate_url(normalized)
    return normalized
