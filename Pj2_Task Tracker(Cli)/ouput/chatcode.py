import sys
import json
import os


# ------------------------------- func
# 1) LOAD TASKS
def load_tasks():
    """โหลดไฟล์ tasks.json ถ้ามี ถ้าไม่มีก็คืนลิสต์ว่าง"""
    if os.path.exists("tasks.json"):
        with open("tasks.json", "r") as f:
            return json.load(f)
    else:
        return []


# 2) SAVE TASKS
def save_tasks(tasks):
    """บันทึก tasks ลงไฟล์ JSON"""
    with open("tasks.json", "w") as f:
        json.dump(tasks, f, indent=4)


# 3) ตรวจว่ามี command เช่น add/del/lst
def check_startcmd():
    if len(sys.argv) < 2:
        print("Please provide a command: add, del, lst")
        sys.exit()


# 4) ตรวจว่ามี argument เช่น add <msg>
def check_taskcmd():
    if len(sys.argv) < 3:
        print("Error: missing argument")
        sys.exit()


# 5) ADD TASK
def add_task():
    check_taskcmd()
    title = sys.argv[2]
    tasks.append({"title": title, "status": "todo"})
    save_tasks(tasks)
    print(f"Added: {title}")


# 6) DELETE TASK
def del_task():
    check_taskcmd()
    index = int(sys.argv[2])

    if index < 0 or index >= len(tasks):
        print("Error: invalid index")
        sys.exit()

    removed = tasks.pop(index)
    save_tasks(tasks)
    print(f"Deleted: {removed['title']}")


# 7) UPDATE STATUS (แบบเต็ม)
def update_status():
    """อัปเดตสถานะของ task ตาม index"""
    if len(sys.argv) < 4:
        print("Usage: python main.py status <index> <todo|in-progress|done|0|1|2>")
        sys.exit()

    index = int(sys.argv[2])

    if index < 0 or index >= len(tasks):
        print("Error: invalid index")
        sys.exit()

    raw_status = sys.argv[3]
    allowed = ["todo", "in-progress", "done"]

    if raw_status.isdigit():
        num = int(raw_status)
        if num < 0 or num >= len(allowed):
            print("Error: status index must be 0–2")
            sys.exit()
        new_status = allowed[num]

    else:
        if raw_status not in allowed:
            print("Error: status must be one of:", allowed)
            sys.exit()
        new_status = raw_status

    tasks[index]["status"] = new_status
    save_tasks(tasks)
    print(f"Updated task {index} → {new_status}")


# 8) QUICK STATUS CHANGE (done/todo/prog)
def quick_status_change(command):
    """เปลี่ยนสถานะแบบคำสั่งสั้น"""
    if len(sys.argv) < 3:
        print(f"Usage: python main.py {command} <index>")
        sys.exit()

    index = int(sys.argv[2])

    if index < 0 or index >= len(tasks):
        print("Error: invalid index")
        sys.exit()

    mapping = {"done": "done", "todo": "todo", "prog": "in-progress"}
    new_status = mapping[command]

    tasks[index]["status"] = new_status
    save_tasks(tasks)
    print(f"Task {index} updated → {new_status}")


# 9) LIST TASKS
def lst_task():
    """แสดงรายการทั้งหมด หรือเฉพาะสถานะ"""

    if len(sys.argv) == 2:
        status_filter = None
    else:
        status_filter = sys.argv[2]
        mapping = {"done": "done", "todo": "todo", "prog": "in-progress"}

        if status_filter not in mapping:
            print("Error: status must be one of: done, todo, prog")
            sys.exit()

        status_filter = mapping[status_filter]

    print("\nYour tasks:")

    if not tasks:
        print("  No tasks found.")
        return

    for i, t in enumerate(tasks):
        if status_filter and t["status"] != status_filter:
            continue

        print(f"  {i}. {t['title']}  [{t['status']}]")


# ------------------------------- MAIN

check_startcmd()
tasks = load_tasks()
command = sys.argv[1]

if command == "add":
    add_task()

elif command == "del":
    del_task()

elif command == "lst":
    lst_task()

elif command == "status":
    update_status()

elif command in ["done", "todo", "prog"]:
    quick_status_change(command)

elif command == "list":
    lst_task()

else:
    print("Unknown command")
