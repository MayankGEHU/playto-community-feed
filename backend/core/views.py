from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models import Sum
from django.db import transaction, IntegrityError

from .models import *
from .serializers import *


# ========================
# GET POSTS
# ========================

@api_view(['GET'])
def get_posts(request):

    posts = Post.objects.select_related('author')
    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data)


# ========================
# CREATE POST
# ========================

@api_view(['POST'])
def create_post(request):

    serializer = PostSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(author=User.objects.first())

    return Response(serializer.data)


# ========================
# GET COMMENTS
# ========================

@api_view(['GET'])
def get_comments(request, post_id):

    comments = Comment.objects.filter(post_id=post_id).select_related('author')
    serializer = CommentSerializer(comments, many=True)

    return Response(serializer.data)


# ========================
# ADD COMMENT
# ========================

@api_view(['POST'])
def add_comment(request):

    serializer = CommentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(author=User.objects.first())

    return Response(serializer.data)


# ========================
# LIKE POST
# ========================

@api_view(['POST'])
def like_post(request, post_id):

    user = User.objects.first()
    post = Post.objects.get(id=post_id)

    try:
        with transaction.atomic():

            Like.objects.create(user=user, post=post)

            KarmaTransaction.objects.create(
                user=post.author,
                points=5,
                source="post_like"
            )

    except IntegrityError:
        pass

    return Response({"message": "liked"})


# ========================
# LIKE COMMENT
# ========================

@api_view(['POST'])
def like_comment(request, comment_id):

    user = User.objects.first()
    comment = Comment.objects.get(id=comment_id)

    try:
        with transaction.atomic():

            Like.objects.create(user=user, comment=comment)

            KarmaTransaction.objects.create(
                user=comment.author,
                points=1,
                source="comment_like"
            )

    except IntegrityError:
        pass

    return Response({"message": "liked"})


# ========================
# LEADERBOARD
# ========================

@api_view(['GET'])
def leaderboard(request):

    since = timezone.now() - timezone.timedelta(hours=24)

    data = (
        KarmaTransaction.objects
        .filter(created_at__gte=since)
        .values('user__username')
        .annotate(total_karma=Sum('points'))
        .order_by('-total_karma')[:5]
    )

    return Response(data)
