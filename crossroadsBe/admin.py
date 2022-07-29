from django.contrib import admin

from .models import Profile, StoreItem, Inventory, Quiz, Plays, Feedback, Facts

admin.site.register(Profile)
admin.site.register(StoreItem)
admin.site.register(Inventory)
admin.site.register(Quiz)
admin.site.register(Plays)
admin.site.register(Feedback)
admin.site.register(Facts)