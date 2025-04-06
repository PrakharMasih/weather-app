import requests
from typing import List
from enum import Enum
from pydantic import BaseModel
from dicttoxml import dicttoxml
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RAPIDAPI_KEY = "Enter-your-api-key"
RAPIDAPI_URL = "https://weatherapi-com.p.rapidapi.com/current.json"


class OutputFormat(str, Enum):
    json = "json"
    xml = "xml"


class WeatherRequest(BaseModel):
    city: str
    output_format: OutputFormat


class HistoryEntry(BaseModel):
    city: str


search_history: List[str] = []
history_response: List[HistoryEntry] = []


@app.post("/getCurrentWeather")
def get_current_weather(request: WeatherRequest) -> Response:
    city_key = request.city.lower()

    if city_key not in search_history:
        if len(search_history) >= 5:
            search_history.pop(0)
            history_response.pop(0)

        search_history.append(city_key)
        history_response.append(HistoryEntry(city=request.city))

    response = requests.get(
        RAPIDAPI_URL,
        headers={
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        },
        params={"q": request.city},
    )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code, detail="Failed to fetch weather data"
        )

    data = response.json()
    result = {
        "Temperature": f"{data['current']['temp_c']} C",
        "City": f"{data['location']['name']} {data['location']['country']}",
        "Latitude": str(data["location"]["lat"]),
        "Longitude": str(data["location"]["lon"]),
    }

    if request.output_format == OutputFormat.json:
        return JSONResponse(content=result)

    xml_output = dicttoxml(result, custom_root="root", attr_type=False)
    return Response(content=xml_output, media_type="application/xml")


@app.get("/history", response_model=List[HistoryEntry])
def get_search_history():
    return history_response


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app=app, host="127.0.0.1", port=9000)
