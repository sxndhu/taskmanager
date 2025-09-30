"""
URL configuration for taskmanager project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 
from tasks.views import UserRegisterView, LogoutView, TaskListCreateView, TaskDetailView


urlpatterns = [
    path('admin/', admin.site.urls),

    # AUTH ENDPOINTS
    path('auth/register/', UserRegisterView.as_view(), name = 'register'),
    path('auth/login/', TokenObtainPairView.as_view(), name = 'login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name = 'logout'),

    # Task endpoints
    path('tasks/', TaskListCreateView.as_view(), name = 'task_list_create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name = 'task_detail'),
]
