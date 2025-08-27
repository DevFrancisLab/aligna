# backend/authentication/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('forgot-password/', views.forgot_password, name='forgot-password'),
    path('profile/', views.user_profile, name='user-profile'),
    path('logout/', views.logout, name='logout'),
]
