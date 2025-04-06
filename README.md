# 🌦️ Weather App (React + FastAPI)

A full-stack weather application that fetches real-time weather data by city name and supports both JSON and XML formats. It also keeps track of the last 5 unique city searches using FastAPI (backend) and React (frontend).

---


https://github.com/user-attachments/assets/a665b77c-9255-4efa-b550-ac1a44c57496



https://github.com/user-attachments/assets/4d7a894e-b5e3-423c-b764-44ddc69a787a




## 📌 Features

### ✅ Backend (FastAPI)
- Fetches real-time weather data using WeatherAPI via RapidAPI.
- Supports both `JSON` and `XML` response formats.
- Maintains **search history (up to 5 cities)** without repetition.
- Case-insensitive matching of city names.
- Built with PEP 8 compliant Python code.
- Optimized with `Enum`, `pydantic`, and response classes.

### ✅ Frontend (React)
- Real-time weather search using city name.
- Search input with **debounced** API call.
- Displays temperature (in Celsius), city, coordinates.
- Maintains and displays last 5 unique searched cities.
- Responsive card layout with **glassmorphism effect**.
- Background image support.

---

## 🧰 Tech Stack

| Layer     | Technology             |
|-----------|------------------------|
| Frontend  | React, HTML, CSS       |
| Backend   | FastAPI, Pydantic      |
| API       | [WeatherAPI](https://weatherapi.com/) via RapidAPI |
| Styling   | Custom CSS (with blur, transitions) |
| Tools     | Axios/Fetch, uvicorn, Enum, dicttoxml |

---

## 🛠️ Backend Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/weather-app
cd weather-app/backend
```
### 2. Create Virtual Environment
```
python -m venv env
source env/bin/activate  # for Linux/macOS
env\Scripts\activate     # for Windows
```
### 3. Install Dependencies
```
pip install -r requirements.txt

```
### 4. Run Backend Server
```
uvicorn main:app --reload --port 9000
```

## 🌐 Frontend Setup

### 1. Navigate to Frontend Folder
```
cd ../frontend
```
### 2. Install Node Modules
```
npm install
```
### 3. Start React App
```
npm start
```

## 🔐 Environment Variables
Replace your RapidAPI key inside main.py:
```
RAPIDAPI_KEY = "your_actual_api_key"
```

