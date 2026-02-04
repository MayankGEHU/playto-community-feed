from django.urls import path
from .views import *

urlpatterns = [
    path('posts/', get_posts),
    path('create-post/', create_post),

    path('comments/<int:post_id>/', get_comments),
    path('comments/', add_comment),

    path('like-post/<int:post_id>/', like_post),
    path('like-comment/<int:comment_id>/', like_comment),

    path('leaderboard/', leaderboard),
]
