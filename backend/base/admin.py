from django.contrib import admin
from .models import Product,OrderItem,Orders,CustomUser
# Register your models here.
admin.site.register(Product)
admin.site.register(Orders)
admin.site.register(OrderItem)
admin.site.register(CustomUser)