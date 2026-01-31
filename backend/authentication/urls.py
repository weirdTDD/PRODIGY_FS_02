from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import login_view, logout_view, user_profile, register_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
    path('profile/', user_profile, name='user-profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]

