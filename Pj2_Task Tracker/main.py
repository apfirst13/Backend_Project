import sys
import json
import os

# -------------------------------
# 1) โหลดไฟล์ tasks.json ถ้ามี


if os.path.exists("tasks.json"):
    with open("tasks.json", "r") as f:
        tasks = json.load(f)  # โหลดข้อมูลจากไฟล์
else:
    tasks = []  # ถ้าไม่มีไฟล์ ให้เริ่มจากลิสต์ว่าง


# -------------------------------
# 2) เช็คว่าผู้ใช้ส่ง command มั้ย


if len(sys.argv) < 2:
    print("Please provide a command: add, del, list")
    sys.exit()

command = sys.argv[1]


# -------------------------------
# 3) ADD TASK


if command == "add":
    if len(sys.argv) < 3:
        print('Usage: add "task name"')
        sys.exit()

    title = sys.argv[2]
    tasks.append(title)  # เพิ่มงานลงลิสต์

    # บันทึกลงไฟล์
    with open("tasks.json", "w") as f:
        json.dump(tasks, f, indent=4)

    print(f"Added task: {title}")


# -------------------------------
# 4) DELETE TASK

elif command == "del":
    if len(sys.argv) < 3:
        print('Usage: del "task name"')
        sys.exit()

    title = sys.argv[2]

    if title in tasks:
        tasks.remove(title)

        with open("tasks.json", "w") as f:
            json.dump(tasks, f, indent=4)

        print(f"Deleted task: {title}")
    else:
        print("Task not found!")


# -------------------------------
# 5) LIST TASKS

elif command == "list":
    print("\nYour tasks:")
    for i, t in enumerate(tasks, start=1):
        print(f"{i}. {t}")
    print()


# -------------------------------
# 6) UNKNOWN COMMAND

else:
    print("Unknown command")
