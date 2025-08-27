from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .metta_service import metta, add_task_to_metta, add_priority_levels, schedule_tasks

# Ensure priority levels exist
add_priority_levels()

def full_schedule(request):
    """Return full scheduled tasks"""
    try:
        tasks = schedule_tasks()
        return JsonResponse({"schedule": tasks})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def next_task(request):
    """Return the next recommended task"""
    try:
        tasks = schedule_tasks()
        next_t = tasks[0] if tasks else None
        return JsonResponse({"next_task": next_t})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def add_task(request):
    """Add a new task"""
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)
    try:
        data = json.loads(request.body)
        required_fields = ["id", "title", "description", "deadline", "priority", "dependencies"]
        for field in required_fields:
            if field not in data:
                return JsonResponse({"error": f"'{field}' is required"}, status=400)
        add_task_to_metta(data)
        return JsonResponse({"message": f"Task '{data['id']}' added successfully", "schedule": schedule_tasks()})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def complete_task(request):
    """Mark a task as completed"""
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)
    try:
        data = json.loads(request.body)
        task_name = data.get("name")
        if not task_name:
            return JsonResponse({"error": "Task name is required"}, status=400)
        # Remove completed task from MeTTa (simple mock logic)
        # Actual MeTTa logic would go here
        return JsonResponse({"message": f"Task '{task_name}' marked as completed", "schedule": schedule_tasks()})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
