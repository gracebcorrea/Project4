import sqlite3, datetime, os, os.path
import time
from datetime import datetime

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, Profile, Posts


def index(request):
    d = datetime.now()
    Profile =  Profile.objects.all()
    AllPosts = Posts.objects.all()




    context={
            "Today" : d,
            "AllPosts": AllPosts,
    }
    return render(request, "network/index.html", context)


    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

"""__________________________________________________________________________________________________"""

def profile(request):

    return render(request, "network/profile.html")

def Allposts(request):

    return render(request, "network/index.html")

class Pegafoto(models.Manager):
    def PegaFotoPost(self):

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT pr.User_id, pr.Avatar, po.Post, po.Date, po.Likes, po.Unlikes
                FROM network_profile pr, network_posts po
                WHERE pr.User_id = po.User_id
                ORDER BY po.Date DESC""")
            result_list = []
            for row in cursor.fetchall():
                p = self.model(User_id=row[0],Avatar=row[1], Post=row[2], Date=row[3], Likes=[4], Unlikes=[5] )

                result_list.append(p)
        return result_list
