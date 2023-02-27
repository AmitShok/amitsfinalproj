from rest_framework import serializers
from .models import CustomUser, Product,OrderItem,Orders,Review





class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

    # def create(self, validated_data):
    #     order = self.context['order']
    #     return Orders.objects.create(**validated_data,order=order)

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Orders
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['user']
        return Orders.objects.create(**validated_data, user=user)

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    
    def get_user(self, obj):
        return obj.user.username



# profile
class CustomUserSerializer(serializers.ModelSerializer): 
    name = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    admin = serializers.SerializerMethodField(read_only=True)
    class Meta: 
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def get_name(self, object):
        name = object.first_name
        if name == '':
            name = object.email
        return name

    def get_id(self, object):
        return object.id

    def get_admin(self, object):
        return object.is_staff
  
    def create(self, validated_data): 
        user = self.context['user']
        return CustomUser.objects.create(**validated_data, user = user)





class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['user']
        return Review.objects.create(**validated_data, user=user)

    # def create(self, validated_data):
    #     user = self.context['user']
    #     return Review.objects.create(user=user,  **validated_data)
