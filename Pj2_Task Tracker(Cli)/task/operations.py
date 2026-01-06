import sys
from .io import load_tasks, save_tasks
from .utils import now

# operation

# add task
def add_task(title):
    """
    function add task
    """
    tasks = load_tasks()#load task
    tasks.append(
        
        {"title": title, "status": "todo", "created_at": now(), "updated_at": now()}
    )
    
    save_tasks(tasks)
    return f"Added: {title}"

# del task
def delete_task(index):
    """
    function delete task
    """
    tasks = load_tasks()

    if index < 0 or index >= len(tasks):
        return "Error: invalid index"

    removed = tasks.pop(index)
    save_tasks(tasks)
    return f"Deleted: {removed['title']}"

# show task by argument
def show_task():
    """แสดงรายการงานทั้งหมด หรือเฉพาะสถานะตามที่ผู้ใช้ระบุ"""
    tasks = load_tasks()
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
            print("error: status must be one of : done, todo, prog")
            sys.exit()
            
        status_filter = mapping[status_filter]#if sys=prog status=progress
        
    print("\nYour tasks:")
    
    #ถ้า list ว่าง
    if not tasks:
        print(" No tasks found.")
        return

    # วนลูปแสดงรายการ
    for i, t in enumerate(tasks):#ทำให้เป็นตัวเลข

        # ถ้ามี filter → ข้ามงานที่ไม่ตรง
        if status_filter and t["status"] != status_filter:
            continue

        icon = icons[t["status"]]

        print(f"{i}. {t['title']}  [{icon} {t['status']}]")
        print(f"     created: {t.get('created_at', '-')}")
        print(f"     updated: {t.get('updated_at', '-')}")


def update_status():
    """อัปเดตสถานะของ task ตาม index"""
    tasks = load_tasks()
    print("test1")
    if len(sys.argv) < 4:
        print("Usage: python main.py status <index> <todo|in-progress|done>")
        sys.exit()

    index = int(sys.argv[2])

    if index < 0 or index >= len(tasks):
        print("Error: invalid index")
        sys.exit()

    # ---- status ----
    raw_status = sys.argv[3]#done todo,...
    allowed = ["todo", "in-progress", "done"]
    print(raw_status.isdigit())
    # กรณีป้อนเป็นตัวเลข 0 1 2
    if raw_status.isdigit():
        ""        
        ndata = int(sys.argv[2])
        x = tasks[ndata]
        # print(ndata)
        # print(type(ndata))
        # print(x)

        num = int(raw_status)
        if num < 0 or num >= len(allowed):
            print("Error: status index must be 0–2")
            sys.exit()
        new_status = allowed[num]
        # print(tasks[ndata])
        x['status'] = new_status
        # print(x)
        # print(tasks)
        save_tasks(tasks)

    # กรณีป้อนเป็นคำ
    else:
        if raw_status not in allowed:
            print("Error: status must be one of:", allowed)
            sys.exit()
        new_status = raw_status
    
