import re
import ipaddress
from urllib.parse import urlparse
from fastapi import HTTPException

BLOCKED_HOSTS = {"localhost", "127.0.0.1", "0.0.0.0", "::1"}
BLOCKED_PREFIXES = ("10.", "172.16.", "172.17.", "172.18.", "172.19.", "172.20.", "172.21.", "172.22.", "172.23.", "172.24.", "172.25.", "172.26.", "172.27.", "172.28.", "172.29.", "172.30.", "172.31.", "192.168.")

def validate_url(url: str) -> str:
    parsed = urlparse(url)
    if parsed.scheme not in ("http", "https"):
        raise HTTPException(400, "URL must use http or https")
    host = parsed.hostname or ""
    if not host:
        raise HTTPException(400, "Invalid URL: no host")
    if host in BLOCKED_HOSTS:
        raise HTTPException(400, "URL host not allowed")
    for prefix in BLOCKED_PREFIXES:
        if host.startswith(prefix):
            raise HTTPException(400, "URL host not allowed")
    try:
        addr = ipaddress.ip_address(host)
        if addr.is_private or addr.is_loopback or addr.is_link_local:
            raise HTTPException(400, "URL host not allowed")
    except ValueError:
        pass
    return url

def mask_key(key: str) -> str:
    if not key or len(key) < 8:
        return "***"
    return key[:4] + "***" + key[-4:]
