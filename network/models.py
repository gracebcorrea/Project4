from django.contrib.auth.models import AbstractUser
from django.db import models, connection
from django import forms
from django.http import HttpResponseBadRequest, HttpResponseRedirect, Http404
from django.shortcuts import render
from django.urls import reverse

from PIL import Image
from PIL.Image import core as _imaging

from django.conf import settings
from django.conf.urls.static import static


class User(AbstractUser):
    pass

class Profile(models.Model):
    User = models.ForeignKey('User', on_delete = models.CASCADE)
    Follower = models.ManyToManyField('User', blank=True, related_name="Followers")  #seguidores
    Following = models.ManyToManyField('User',blank=True, related_name= "Following")  #seguindo
    Avatar = models.ImageField(upload_to="media", blank=True)

    @property
    def TotalFollowers(self):
        return self.Followers.all().count()

    @property
    def TotalFollowing(self):
        return self.Following.all().count()


    def __str__(self):
        return f"({self.User})({self.Follower})({self.Following})({self.Avatar})"

class Posts(models.Model):
    User = models.ForeignKey('User', on_delete = models.CASCADE)
    Post = models.TextField(max_length=255)
    Date = models.DateTimeField(auto_now_add=True)
    Likes = models.IntegerField(blank=True, null=True)
    Unlikes = models.IntegerField(blank=True, null=True)

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
        return f"({self.User})({self.Post})({self.Date}) ({self.Likes}) ({self.Unlikes}) "

class PostsLikes(models.Model):
    User = models.ForeignKey('User', on_delete = models.CASCADE)
    Posts = models.ForeignKey('Posts', on_delete = models.CASCADE )
    Likes = models.BooleanField(default=False)
    Unlikes = models.BooleanField(default=False)

    @property
    def TotalLikes(self):
        return self.Likes.all().count()

    def __str__(self):
        return f"({self.User})({self.Posts})({self.Likes}) ({self.Unlikes})"
