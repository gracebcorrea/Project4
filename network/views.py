import sqlite3, datetime, os, os.path, time, json, re, requests

from django import forms
from django.contrib import admin
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator
from django.db import IntegrityError,connection, models
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound, JsonResponse
from django.shortcuts import render
from django.urls import reverse,include, path
from django.views.decorators.csrf import csrf_exempt


from . import views
from .models import User, Profile, Posts, PostsLikes


class NewPostForm(forms.Form):
    NewPost = forms.CharField(label= "What are you thinking?",widget=forms.Textarea( attrs={'rows':'3' , 'cols':'140','text-align': 'center' }))


def index(request):
    if request.user.is_authenticated:
        result_list = []
        result_list = allposts()
        paginator = Paginator(result_list, 10)
        #print(paginator.count , paginator.num_pages )

        page_number = request.GET.get('page')
        page_itens = paginator.get_page(page_number)
        #print("ALL POSTS PAGE")
        #print(page_itens)

        context={
            "NewPostForm":NewPostForm(),
            "page_obj": page_itens,
            "UserEdit" : request.user.username,
        }
        return render(request, "network/index.html", context)



    else:
        context={
            "Message": "Please Login or join our Network",
        }
        return render(request, "network/login.html", context)






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
                "Message": "Invalid username and/or password."
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
                "Message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()

        except IntegrityError:
            return render(request, "network/register.html", {
                "Message": "Username already taken."
            })


        login(request, user)
        return HttpResponseRedirect(reverse("network:index"))
    else:

        return render(request, "network/register.html" )

"""__________________________________________________________________________________________________"""

@login_required
@csrf_exempt
def profile(request,username):
    if request.user.is_authenticated:
        profile= []
        UserPosts = []
        TFollowers = 0
        TFollowing = 0

        searchuser = username
        userid = User.objects.filter(username=searchuser).values('id')
        print("inside profile")
        for u in userid:
            User_id = int(u['id'])
        print(userid, User_id )
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

        paginator = Paginator(UserPosts, 10)
        page_number = request.GET.get('page')
        page_itens = paginator.get_page(page_number)

        #print("PROFILE PAGE")
        #print(paginator.count , paginator.num_pages )

        context={
            "User":searchuser,
            "Profiles":profile,
            "TotalFollowers":TFollowers,
            "TotalFollowing":TFollowing,
            "ShowFollowornot" :ShowFollowornot,
            "btnfollow" : btnfollow,
            "UserFollowers":UFollowers,
            "Userfollowing":UFollowing ,
            "page_obj": page_itens,
            "UserEdit" : request.user.username,

        }
        return render(request, "network/profile.html", context)
    else:
        context={
            "Message": "Please Login or join our Network",
        }
        return render(request, "network/login.html", context)


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

                paginator = Paginator(allposts(), 10)
                page_number = request.GET.get('page')
                page_itens = paginator.get_page(page_number)
                #print("ALL POSTS PAGE")
                #print(paginator.count , paginator.num_pages )

                context={
                    "NewPostForm":NewPostForm(),
                    "page_obj": page_itens,
                }
                return render(request, "network/index.html", context)
            except IntegrityError as e:
                return HttpResponse( "ERROR trying to save New Post." + e )
    else:
            context={
               "NewPostForm":NewPostForm(),
               "page_obj": allposts(),
               "Username":username,
            }
            return render(request, "network/index.html", context)





@login_required
def following_view(request):
    FPL = []
    profile= []
    following = []
    posts = []
    postchoose = []

    if request.user.is_authenticated:
          posts = Posts.objects.all().order_by('-Date')
          user = request.user.id
          username = request.user.username
          seguindo = Profile.objects.filter(Follower=user)
          print(user, username )

          for row in posts:
              for s in seguindo:
                  if row.User == s.User:
                      #r.append(s.Avatar) como juntar a foto na query?
                      FPL.append(row)

          paginator = Paginator(FPL, 10)
          page_number = request.GET.get('page')
          page_itens = paginator.get_page(page_number)

          print("FOLLOWING PAGE")
          print(paginator.count , paginator.num_pages )
          print(page_itens)

    else:
        context={
            "Message": "Please Login or join our Network",
        }
        return render(request, "network/login.html", context)


    context = {
         "page_obj" : page_itens,
         "NewPostForm":NewPostForm(),
    }

    return render(request, "network/following.html", context)




def allposts():
    with connection.cursor() as cursor:
        cursor.execute(f"""
            SELECT u.username, pr.Avatar,po.id, po.Post, po.Date, po.Likes, po.Unlikes
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

"""
___________________________________________________  APIs_______________________________________________________
"""


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


            return JsonResponse({"Message": "Followers successfully changed."}, status=201)
        except:
            return JsonResponse({"error": "Something Wrong trying to save changes." }, status=400)

    return HttpResponse(status=204)

@login_required
@csrf_exempt
def editpost_view(request):


    if request.method == "PUT":
        print("inside PUT from editpost_view")
        data = json.loads(request.body)
        print(f"DATA JSON", data)

        id = int(data['postid'])
        newpost = data['newtext']
        print(id )
        print( newpost )
        Posttochange = Posts.objects.get(id=id)


        print(Posttochange)


        try:
            Posttochange.Post= newpost
            Posttochange.save()
            return JsonResponse({"Message": "Post successfully changed "}, status=201)

        except Exception as e:
            print("Exception trying to save post edit:",e)
            return JsonResponse({"error": f"{e} "  })


    else:
        return JsonResponse({"Message": "Wrong Method , You´re not inside PUT."}, status=400 )

@login_required
@csrf_exempt
def likes_view(request):
    if request.method == "PUT":
        data = json.loads(request.body)
        id = int(data['postid'])
        Liketoadd = Posts.objects.get(id=id)
        LikeUser = Liketoadd.User_id
        print(Liketoadd)
        print(LikeUser ,request.user.id )

        if LikeUser == request.user.id :
            return JsonResponse({"Message": "You cannot like your own post"}, status=403)
        else:
            checklikes = PostsLikes.objects.get(Posts_id=id ,User_id=LikeUser)

            if checklikes is not None:
                print(checklikes)
                try:
                    checklikes.delete()
                    Liketoadd.Likes -= 1
                    Liketoadd.save()
                    print("User already like this post, removing like")
                    return JsonResponse({"Message": "User already liked this post, removing like"}, status=403)
                except Exception as e:
                    print("Exception trying to save post edit:",e)
                    return JsonResponse({"error": f"{e} "  })

            else:
                try:
                    Newlikes = PostsLikes.objects.create(User_id=LikeUser,Posts_id=id,Likes=1)
                    Newlikes.save()
                    if Liketoadd.Likes is None:
                        Liketoadd.Likes = 1
                    else:
                        Liketoadd.Likes += 1
                    Liketoadd.save()
                    return JsonResponse({"Message": "Like added! "}, status=201)

                except Exception as e:
                    print("Exception trying to save post edit:",e)
                    return JsonResponse({"error": f"{e} "  })
    else:
        return JsonResponse({"Message": "Not inside PUT."}, status=400)




@login_required
@csrf_exempt
def unlikes_view(request):
    #if request.method == "PUT":
    #    data = json.loads(request.body)






    return JsonResponse({"Message": "unLike Status changed."}, status=201)



#winpty python manage.py createsuperuser
