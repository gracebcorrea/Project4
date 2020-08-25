from django.contrib import admin
from .models import User, Profile, Posts, PostsLikes

# Register your models here.

class Admin(admin.ModelAdmin):
    filter_horizontal = ("network",)


admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Posts)
admin.site.register(PostsLikes)
