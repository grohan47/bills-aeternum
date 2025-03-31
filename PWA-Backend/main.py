from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
 
app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify frontend URL)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define the trusted sender for transaction emails
TRUSTED_SENDER = "transactions@bank.com"
 
# Dummy in-memory store for user data
users = {
    "rohan@example.com": {
        "investment_preferences": {
            "gold": 20,
            "mutual_fund": 50,
            "expenditure": 30
        },
        "goals": ["Buy a car", "Save for vacation"],
        "other_data": "This is dummy data for Rohan."
    }
}
 
# Pydantic model to validate incoming preference updates
class PreferencesUpdate(BaseModel):
    gold: int
    mutual_fund: int
    expenditure: int
 
@app.get("/user/{email}")
async def get_user(email: str):
    if email not in users:
        raise HTTPException(status_code=404, detail="User not found")
    return users[email]
 
@app.post("/user/{email}/preferences")
async def update_preferences(email: str, prefs: PreferencesUpdate):
    if email not in users:
        # Create a new user if not already existing
        users[email] = {
            "investment_preferences": {},
            "goals": [],
            "other_data": ""
        }
    users[email]["investment_preferences"] = {
        "gold": prefs.gold,
        "mutual_fund": prefs.mutual_fund,
        "expenditure": prefs.expenditure,
    }
    return {"status": "success", "preferences": users[email]["investment_preferences"]}
 
# Dummy list of emails for demonstration purposes.
dummy_emails = [
    {
        "sender": "random@other.com",
        "subject": "Hello",
        "body": "Just a random email."
    },
    {
        "sender": "transactions@bank.com",
        "subject": "Your transaction details",
        "body": "A transaction of ₹500 occurred."
    },
    {
        "sender": "news@newsletter.com",
        "subject": "Weekly Newsletter",
        "body": "Your weekly news update."
    }
]
 
async def process_email(email: dict):
    """
    Process the email only if it is from the trusted sender.
    """
    if email["sender"] == TRUSTED_SENDER:
        # In a real implementation, you might parse the email contents,
        # update user data, trigger notifications, etc.
        print(f"Processing transaction email: {email}")
    else:
        print(f"Ignoring email from: {email['sender']}")
 
async def email_listener():
    """
    Dummy background task that simulates checking for new emails every 30 seconds.
    """
    while True:
        print("Listening for new emails...")
        # In a real scenario, connect to an email server (IMAP/POP3) to fetch emails.
        for email in dummy_emails:
            await process_email(email)
        # Wait 30 seconds before checking again.
        await asyncio.sleep(30)
 
@app.on_event("startup")
async def startup_event():
    """
    Start the background email listener when the app starts.
    """
    asyncio.create_task(email_listener())
 
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)