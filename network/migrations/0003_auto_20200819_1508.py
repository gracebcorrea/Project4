# Generated by Django 3.1 on 2020-08-19 18:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0002_posts_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='Likes',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='posts',
            name='Unlikes',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='Follower',
            field=models.ManyToManyField(blank=True, related_name='Followers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='profile',
            name='Following',
            field=models.ManyToManyField(blank=True, related_name='Following', to=settings.AUTH_USER_MODEL),
        ),
    ]
