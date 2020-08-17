from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime


class User(AbstractUser):
    pass

class Profile(models.Model):
    User = models.ForeignKey('User', on_delete=models.CASCADE,related_name='username')
    Follower = models.ForeignKey('User', on_delete=models.CASCADE, related_name='followings')  #seguidores
    Following = models.ForeignKey('User', on_delete=models.CASCADE, related_name='followers')  #seguindo

    @property
    def TotalFollowers(self):
        return self.Followers.all().count()

    @property
    def TotalFollowing(self):
        return self.Following.all().count()


    def __str__(self):
        return f"({self.User['id']}) ({self.User['username']})({self.Followers})({self.Following})"

class Posts(models.Model):
    User = models.ForeignKey('User', on_delete=models.CASCADE, related_name='author')
    Post = models.TextField(max_length=255)
    Date = models.DateField(help_text="Please use the following format: <em>YYYY-MM-DD</em>.")
    Likes = models.IntegerField()
    Unlikes = models.IntegerField()

    @property
    def TotalPosts(self):
        return self.Post.all().count()
    @property
    def TotalLikes(self):
        return self.Likes.all().count()
    @property
    def TotalUnLikes(self):
        return self.Unlikes.all().count()


    def __str__(self):
        return f"({self.User['id']}) ({self.User['username']})({self.Post})({self.Date}) ({self.Likes}) ({self.Unlikes}) "
