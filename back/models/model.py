from pydantic import BaseModel
from pydantic.dataclasses import dataclass
from typing import Any, List

class Response(BaseModel):
    data: List[Any]
    status_code: int
    message: str

@dataclass
class Error(Exception):
    status_code: int
    message: str
