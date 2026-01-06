import sys
from task.operations import add_task, delete_task, show_task, update_status


def run():
    if len(sys.argv) < 2:
        print("Commands: add, del, lst")
        return

    command = sys.argv[1]

    if command == "add":
        print(add_task(" ".join(sys.argv[2:])))#list type

    elif command == "del":
        print(delete_task(int(sys.argv[2])))

    elif command == "sw_task":#show task
        print(show_task())
        
    elif command == "upd_stat":
        print(update_status())
        
    # elif command == "test":
    #     print()
    else:
        print("Unknown command")
