from django.contrib import admin

from .models import Profile, StoreItem, Inventory, InventoryStoreItem, Quiz, Play, Feedback, Fact

admin.site.register(Profile)
admin.site.register(StoreItem)
admin.site.register(Inventory)
admin.site.register(InventoryStoreItem)
admin.site.register(Quiz)
admin.site.register(Play)
admin.site.register(Feedback)
admin.site.register(Fact)