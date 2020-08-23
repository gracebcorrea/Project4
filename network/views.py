import sqlite3, datetime, os, os.path, time, json, re, requests

from django import forms
from django.contrib import admin
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError,connection, models
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound, JsonResponse
from django.shortcuts import render
from django.urls import reverse,include, path
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt


from . import views
from .models import User, Profile, Posts


class NewPostForm(forms.Form):
    NewPost = forms.CharField(label= "What are you thinking?",widget=forms.Textarea( attrs={'rows':'3' , 'cols':'140','text-align': 'center' }))

def index(request):

    if request.user.is_authenticated:
        result_list = []
        result_list = allposts()
    else:
        context={
            "Message": "Please Login or join our Network",
        }
        return render(request, "network/login.html", context)

    context={
        "AllPosts": result_list,
        "NewPostForm":NewPostForm(),
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

        return render(request, "network/register.html" )

"""__________________________________________________________________________________________________"""

@login_required
@csrf_exempt
def profile(request,username):
    profile= []
    UserPosts = []
    TFollowers = 0
    TFollowing = 0

    searchuser = username
    userid = User.objects.filter(username=searchuser).values('id')
    for u in userid:
        User_id = int(u['id'])

    profile = Profile.objects.filter(User=User_id )
    UserPosts = Posts.objects.filter(User=User_id).order_by('-Date')

    for FS in profile:
        TFollowers = FS.Follower.all().count() #total followers
        UFollowers = FS.Follower.all() #followers names

    for FG in profile:
        TFollowing = FG.Following.all().count() #total following
        UFollowing = FG.Following.all() #following names

    if request.user.id == User_id:
        ShowFollowornot = "no"
    else:
        ShowFollowornot = "yes"


    if request.user in UFollowers:
        btnfollow = "Unfollow"
    else:
        btnfollow = "Follow"

    """
    print("Logged User :", request.user.id ,request.user)
    print("Profile Shown :", User_id)
    print("Show follow button ? ", ShowFollowornot)
    print("Followers :", UFollowers)
    print("Follow or Unfollow ? :" ,btnfollow )
    """

    context={
        "User":searchuser,
        "Profiles":profile,
        "TotalFollowers":TFollowers,
        "TotalFollowing":TFollowing,
        "ShowFollowornot" :ShowFollowornot,
        "btnfollow" : btnfollow,
        "UserFollowers":UFollowers,
        "Userfollowing":UFollowing ,
        "UserPosts": UserPosts,

    }
    return render(request, "network/profile.html", context)

def createprofile(username,userid):




    return render(request, "network/profile.html", context)


@login_required
def post_view(request,username):

    if request.method == "POST":
        PV = NewPostForm(request.POST)
        if PV.is_valid():
            PV_user=request.user
            PV_post=PV.cleaned_data["NewPost"]
            try:
                NewPost = Posts(User=PV_user  , Post=PV_post)
                NewPost.save()
                ReloadPosts = allposts()
                context={
                   "NewPostForm":NewPostForm(),
                    "AllPosts": ReloadPosts,
                }
                return render(request, "network/index.html", context)
            except IntegrityError as e:
                print(e)
                return HttpResponse( "ERROR trying to save New Post."  )
    else:
            context={
               "AllPosts": ReloadPosts,
               "NewPostForm":NewPostForm(),
            }

            return render(request, "network/index.html", context)


@login_required
def following_view(request):
    FPL = []  #Following Post List
    Post_list = []
    if request.user.is_authenticated:
        Post_list = Posts.objects.all()
    else:
        context={
            "Message": "Please Login or join our Network",
        }
        return render(request, "network/login.html", context)


    profile = Profile.objects.filter(User=request.user)
    for U in profile:
        UFollowing = U.Following.all() #following names

    print("SEGUINDO : ",UFollowing )

    for Post in Post_list:
        P=Post
        print(P)
        for User in UFollowing:
            U=User
            print(U)
            if U in P:
                FPL.append(P)

    print(FPL)

    context = {

         "FollowingPosts" : FPL,
         "NewPostForm":NewPostForm(),
    }

    return render(request, "network/following.html", context)




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
@csrf_exempt
def followme(request):
    if request.method == "PUT":
        data = json.loads(request.body)

        ProfToChange1 = Profile.objects.get(User=data['id']) #profile id
        ProfToChange2 = Profile.objects.get(User=data['follower'])

        try:
            if data['fornot'] == "Follow": #Follow our unfollow
               ProfToChange1.Follower.add(data['follower'])  #Follower id add
               ProfToChange1.save()
               ProfToChange2.Following.add(data['id']) #Following id add
               ProfToChange2.save()

            if data['fornot'] == "Unfollow":
                ProfToChange1.Follower.remove(data['follower'])
                ProfToChange1.save()

                ProfToChange1.Follower.remove(data['id'])
                ProfToChange2.save()


            return JsonResponse({"message": "Followers successfully changed."}, status=201)
        except:
            return JsonResponse({"error": "Something Wrong trying to save changes." }, status=400)

    return HttpResponse(status=204)



#winpty python manage.py createsuperuser
