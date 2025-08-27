from django.urls import path
from . import views

urlpatterns = [
    path('schedule/', views.full_schedule),
    path('next-task/', views.next_task),
    path('add-task/', views.add_task),
    path('complete-task/', views.complete_task),
]
