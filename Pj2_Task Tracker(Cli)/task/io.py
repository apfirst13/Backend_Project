import json
import os

#fuction loads and save

def load_tasks():
    """Load task when start command"""
    if os.path.exists("tasks.json"):
        with open("tasks.json", "r") as f:
            return json.load(f)
    return []

def change():
    path =os.access("task", os.W_OK)

def save_tasks(tasks):
    " save taks"
    with open("tasks.json", "w") as f:
        json.dump(tasks, f, indent=4)
