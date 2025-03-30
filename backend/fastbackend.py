from fastapi import FastAPI, HTTPException

from pydantic import BaseModel, Field

import json

import os

from typing import Optional

 
app = FastAPI()

 

# Files to store data

LOGIN_FILE = "login.json"

PREFERENCES_FILE = "preferences.json"

 

# Pydantic model for user registration

class UserRegister(BaseModel):

    username: str

    password: str

    email: Optional[str] = None

 

# Pydantic model for user investment preferences

class UserPreferences(BaseModel):

    username: str

    gold_percentage: float = Field(..., ge=0, le=100, description="Percentage allocation for gold (0-100)")

    mf_percentage: float = Field(..., ge=0, le=100, description="Percentage allocation for mutual funds (0-100)")

 

# Helper function to load JSON data from a file

def load_json(file_path: str) -> dict:

    if os.path.exists(file_path):

        with open(file_path, "r") as f:

            try:

                return json.load(f)

            except json.JSONDecodeError:

                return {}

    return {}

 

# Helper function to save JSON data to a file

def save_json(file_path: str, data: dict):

    with open(file_path, "w") as f:

        json.dump(data, f, indent=4)

 

# Endpoint for user registration

@app.post("/register")

async def register(user: UserRegister):

    # Load current user data

    users = load_json(LOGIN_FILE)

 

    # Check if user already exists

    if user.username in users:

        raise HTTPException(status_code=400, detail="User already exists")

 

    # Add the new user

    users[user.username] = {

        "username": user.username,

        "password": user.password, 
        "email": user.email

    }

    save_json(LOGIN_FILE, users)

    return {"message": "Registration successful", "username": user.username}

 

# Endpoint for setting new user preferences

@app.post("/register/new-user-preferences")

async def new_user_preferences(prefs: UserPreferences):

    # Verify that the user is registered

    users = load_json(LOGIN_FILE)

    if prefs.username not in users:

        raise HTTPException(status_code=400, detail="User not registered. Please register first.")

 

    # Load current preferences data

    preferences = load_json(PREFERENCES_FILE)

 

    # Save or update the user's investment preferences

    preferences[prefs.username] = {

        "gold_percentage": prefs.gold_percentage,

        "mf_percentage": prefs.mf_percentage

    }

    save_json(PREFERENCES_FILE, preferences)

    return {"message": "User preferences registered successfully", "username": prefs.username}