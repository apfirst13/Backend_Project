import sys
import json
import os
from datetime import datetime as dt


# ------------------------------- func
# -load task
def load_tasks():
    """โหลดไฟล์ tasks.json ถ้าไม่มีให้คืนค่าลิสต์ว่าง"""
    if os.path.exists("tasks.json"):
        with open("tasks.json", "r") as f:
            return json.load(f)  # ต้อง return!!
    else:
        return []


# 1 save task
def save_tasks(tasks):
    """บันทึก tasks ลงไฟล์"""
    with open("tasks.json", "w") as f:
        json.dump(tasks, f, indent=4)


# 2 check ว่ามี command มั้ย เช่น add/del/lst
def check_startcmd():
    if len(sys.argv) < 2:
        print("Please provide a command: add, del, lst")
        sys.exit()


# 3 check สำหรับคำสั่งที่ต้องการ argument เช่น add <msg> / del <index>
def check_taskcmd():
    if len(sys.argv) < 3:
        print("Error: missing argument")
        sys.exit()


# 10) add times timestamp (created_at, updated_at)
def now():
    """คืนค่าเวลาปัจจุบันในรูปแบบอ่านง่าย"""
    return dt.now().strftime("%Y-%m-%d %H:%M:%S")


# 4 add_task
def add_task():
    check_taskcmd()
    title = sys.argv[2]
    tasks.append(
        {"title": title, "status": "todo", "created_at": now(), "updated_at": now()}
    )
    save_tasks(tasks)
    print(f"Added: {title}")


# 5 delete task
def del_task():
    check_taskcmd()
    index = int(sys.argv[2])

    if index < 0 or index >= len(tasks):
        print("Error: invalid index")
        sys.exit()

    removed = tasks.pop(index)
    save_tasks(tasks)
    print(f"Deleted: {removed['title']}")


# 6 updata status
def update_status():
    """อัปเดตสถานะของ task ตาม index"""
    if len(sys.argv) < 4:
        print("Usage: python main.py status <index> <todo|in-progress|done>")
        sys.exit()

    index = int(sys.argv[2])

    if index < 0 or index >= len(tasks):
        print("Error: invalid index")
        sys.exit()

    # ---- status ----
    raw_status = sys.argv[3]
    allowed = ["todo", "in-progress", "done"]

    # กรณีป้อนเป็นตัวเลข 0 1 2
    if raw_status.isdigit():
        num = int(raw_status)
        if num < 0 or num >= len(allowed):
            print("Error: status index must be 0–2")
            sys.exit()
        new_status = allowed[num]

    # กรณีป้อนเป็นคำ
    else:
        if raw_status not in allowed:
            print("Error: status must be one of:", allowed)
            sys.exit()
        new_status = raw_status

    tasks[index]["updated_at"] = now()
    tasks[index]["status"] = new_status
    save_tasks(tasks)
    print(f"Updated task {index} → {new_status}")


# icon
def status_icon(status):
    icons = {"todo": "📘", "in-progress": "⚙️", "done": "✅"}
    return icons.get(status, "❓")


# change status
def quick_status_change(command):
    """รับคำสั่งสั้นแล้วเปลี่ยนสถานะตามที่ระบุ"""

    if len(sys.argv) < 3:
        print(f"Usage: python main.py {command} <index>")
        sys.exit()

    index = int(sys.argv[2])

    if index < 0 or index >= len(tasks):
        print("Error: invalid index")
        sys.exit()

    # mapping คำสั่งสั้น → status จริง
    mapping = {"done": "done", "todo": "todo", "prog": "in-progress"}
    new_status = mapping[command]

    tasks[index]["updated_at"] = now()
    tasks[index]["status"] = new_status
    save_tasks(tasks)
    print(f"Task {index} updated → {new_status}")


# show task by argument
def lst_task():
    """แสดงรายการงานทั้งหมด หรือเฉพาะสถานะตามที่ผู้ใช้ระบุ"""

    # icon ต้องอยู่ตรงนี้เพื่อให้ทุกกรณีใช้ได้
    icons = {"todo": "📘", "in-progress": "⚙️", "done": "✅"}

    # ถ้าไม่มี argument → แสดงทั้งหมด
    if len(sys.argv) == 2:
        status_filter = None
    else:
        # รับ status filter ตัวที่ 3 เช่น done/todo/prog
        status_filter = sys.argv[2]

        # แมปคำสั่งสั้นเป็นสถานะจริง
        mapping = {"done": "done", "todo": "todo", "prog": "in-progress"}
        if status_filter not in mapping:
            print("Error: status must be one of: done, todo, prog")
            sys.exit()

        status_filter = mapping[status_filter]

    print("\nYour tasks:")

    # ถ้า list ว่าง
    if not tasks:
        print("  No tasks found.")
        return

    # วนลูปแสดงรายการ
    for i, t in enumerate(tasks):

        # ถ้ามี filter → ข้ามงานที่ไม่ตรง
        if status_filter and t["status"] != status_filter:
            continue

        icon = icons[t["status"]]

        print(f"{i}. {t['title']}  [{icon} {t['status']}]")
        print(f"     created: {t.get('created_at', '-')}")
        print(f"     updated: {t.get('updated_at', '-')}")


# 11) edit task
def edit_task():
    """แก้ไขชื่อของ task ตาม index"""
    if len(sys.argv) < 4:
        print('Usage: python main.py edit <index> "new title"')
        sys.exit()

    index = int(sys.argv[2])
    new_title = " ".join(sys.argv[3:])  # รองรับชื่อหลายคำ

    if index < 0 or index >= len(tasks):
        print("Error: invalid index")
        sys.exit()

    tasks[index]["title"] = new_title
    tasks[index]["updated_at"] = now()

    save_tasks(tasks)
    print(f'Updated title of task {index} → "{new_title}"')


# ------------------------------- MAIN PROGRAM

check_startcmd()  # มี command หรือยัง
tasks = load_tasks()  # โหลดไฟล์
command = sys.argv[1]  # ดึงคำสั่งหลัก

if command == "add":
    add_task()

elif command == "del":
    del_task()

elif command == "lst":
    lst_task()

elif command == "list":
    lst_task()

elif command == "status":
    update_status()

elif command in ["done", "todo", "prog"]:
    quick_status_change(command)

elif command == "edit":
    edit_task()

else:
    print("Unknown command")
