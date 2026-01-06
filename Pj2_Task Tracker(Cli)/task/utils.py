from datetime import datetime as dt

def now():
    "funtion return date"
    return dt.now().strftime("%Y-%m-%d %H:%M:%S")


def status_icon(status):
    "function return status icon"
    icons = {"todo": "📘", "in-progress": "⚙️", "done": "✅"}
    return icons.get(status, "❓")
