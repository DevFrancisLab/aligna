from hyperon import MeTTa

# Initialize MeTTa once for the app
metta = MeTTa()

# Priority mapping
PRIORITY_LEVELS = {"High": 1, "Medium": 2, "Low": 3}

def add_priority_levels():
    """Add priority facts to MeTTa"""
    for name, val in PRIORITY_LEVELS.items():
        atom = metta.parse_single(f'(priority {name} {val})')
        metta.space().add_atom(atom)

def add_task_to_metta(task):
    """
    Add a task to MeTTa space
    task: dict with keys: id, title, description, deadline, priority, dependencies
    """
    deps = "(" + " ".join(task.get("dependencies", [])) + ")"
    fact_text = f'(task {task["id"]} Description "{task["title"]}" Deadline "{task["deadline"]}" Priority {task["priority"]} Dependencies {deps} Status Pending)'
    atom = metta.parse_single(fact_text)
    metta.space().add_atom(atom)

def schedule_tasks():
    """
    Returns list of task dicts in recommended order:
    Sorted by priority, then earliest deadline, only Pending tasks
    """
    # Query all tasks
    query = metta.parse_single('(task $id Description $desc Deadline $ddl Priority $prio Dependencies $deps Status $status)')
    results = metta.query(query)

    task_list = []
    for r in results:
        if r.get("$status") != "Pending":
            continue
        task_list.append({
            "id": str(r.get("$id")),
            "title": str(r.get("$desc")),
            "deadline": str(r.get("$ddl")),
            "priority": str(r.get("$prio")),
            "dependencies": [str(d) for d in r.get("$deps", [])]
        })

    # Sort by priority number, then deadline
    def prio_val(prio):
        return PRIORITY_LEVELS.get(prio, 99)

    task_list.sort(key=lambda t: (prio_val(t["priority"]), t["deadline"]))
    return task_list

def complete_task(task_id):
    """
    Mark a task as completed, remove it from other tasks' dependencies
    """
    # Update task status
    for atom in list(metta.space()):
        if atom.pred == "task" and atom.args[0] == task_id:
            # Replace Status Pending with Completed
            new_fact_text = f'(task {task_id} Description "{atom.args[1]}" Deadline "{atom.args[2]}" Priority {atom.args[3]} Dependencies ({ " ".join(atom.args[4]) }) Status Completed)'
            new_atom = metta.parse_single(new_fact_text)
            metta.space().remove_atom(atom)
            metta.space().add_atom(new_atom)
            break

    # Remove task_id from dependencies of other tasks
    for atom in list(metta.space()):
        if atom.pred == "task":
            deps = list(atom.args[4])
            if task_id in deps:
                deps.remove(task_id)
                new_fact_text = f'(task {atom.args[0]} Description "{atom.args[1]}" Deadline "{atom.args[2]}" Priority {atom.args[3]} Dependencies ({ " ".join(deps) }) Status {atom.args[5]})'
                new_atom = metta.parse_single(new_fact_text)
                metta.space().remove_atom(atom)
                metta.space().add_atom(new_atom)
