import sqlite3, datetime, os, os.path, time
from datetime import datetime

from django import forms
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError,connection, models
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound
from django.shortcuts import render
from django.urls import reverse,include, path


from . import views
from .models import User, Profile, Posts


class NewPostForm(forms.Form):
    NewPost = forms.CharField(widget=forms.Textarea)

def index(request):

    if request.user.is_authenticated:
        result_list = []
        result_list = allposts()
        #print(result_list)

        context={
            "AllPosts": result_list,
        }
        return render(request, "network/index.html", context)
    else:
        context={
            "Message": "Please Login or join our Network",
        }
        return render(request, "network/index.html", context)


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("network:index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("network:index"))


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
        return HttpResponseRedirect(reverse("network:index"))
    else:
        return render(request, "network/register.html")

"""__________________________________________________________________________________________________"""

@login_required
def profile(request,username):
    profile= []
    UserPosts = []
    TFollowers = 0
    TFollowing = 0
    user = User.objects.get(username=request.user.username)

    profile = Profile.objects.filter(User=user)
    print(f"Profile:  ",user, profile)

    for FS in profile:
        TFollowers = FS.Follower.all().count() #total followers
        UFollowers = FS.Follower.all() #followers names
    print(TFollowers,UFollowers)

    for FG in profile:
        TFollowing = FG.Following.all().count() #total following
        UFollowing = FG.Following.all() #following names
    print(TFollowing,UFollowing)

    UserPosts = Posts.objects.filter(User=request.user).order_by('-Date')


    context={
        "Profiles":profile,
        "TotalFollowers":TFollowers,
        "TotalFollowing":TFollowing,
        "UserPosts": UserPosts,
        "UserFollowers":UFollowers,
        "Userfollowing":UFollowing ,
    }
    return render(request, "network/profile.html", context)


@login_required
def post_view(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            PV = NewPostForm(request.POST)
            if PV.is_valid():
                PV_user=request.user
                PV_post=PV.cleaned_data["NewPost"]
                PV_date=datetime.now()
                try:
                    NewPost = Posts(User=PV_user  , Post=PV_post  , Date=PV_date)
                    NewPost.save()
                    ReloadPosts = allposts()
                    context={
                       "AllPosts": ReloadPosts,
                       "NewPostForm":NewPostForm(),
                    }
                    return render(request, "network/index.html", context)
                except IntegrityError as e:
                    print(e)
                    return HttpResponse( "ERROR trying to save New Post."  )
        else:
            return render(request, "network/index.html")

def allposts():
    with connection.cursor() as cursor:
        cursor.execute(f"""
            SELECT u.username, pr.Avatar, po.Post, po.Date, po.Likes, po.Unlikes
            FROM network_user u, network_profile pr, network_posts po
            WHERE pr.User_id = po.User_id AND po.User_id = u.id
            ORDER BY po.Date DESC""")
        results = dictfetchall(cursor)

    return results


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

#testing
@login_required
def followme(request):
    if request.method == "POST":
        user = request.POST.get(request.user)
        followornot = request.POST.get("Followme")

        if followornot == 'Followme':
            try:
                # add user to current user's following list
                user = User.objects.get(username=user)
                profile = Profile.objects.get(user=request.user)
                profile.following.add(user)
                profile.save()

                # add current user to  user's follower list
                profile = Profile.objects.get(user=user)
                profile.follower.add(request.user)
                profile.save()


                return JsonResponse({'status': 201}, status=201 )
            except:
                return JsonResponse({}, status=404)
        else:
            try:
                # add user to current user's following list
                user = User.objects.get(username=user)
                profile = Profile.objects.get(user=request.user)
                profile.following.remove(user)
                profile.save()

                # add current user to  user's follower list
                profile = Profile.objects.get(user=user)
                profile.follower.remove(request.user)
                profile.save()
                return JsonResponse({'status': 201, 'followornot': "Follow", "follower_count": profile.follower.count()}, status=201)
            except:
                return JsonResponse({}, status=404)

    return JsonResponse({}, status=400)



#winpty python manage.py createsuperuser
