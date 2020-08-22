from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static


from . import views
from .views import index, login_view, logout_view, register, profile, post_view

app_name = 'network'
urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),


    path("profile/<str:username>",views.profile, name="profile"),
    path("post/<str:username>",views.post_view, name="post"),
    path('followme/', views.followme, name="followme"),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
