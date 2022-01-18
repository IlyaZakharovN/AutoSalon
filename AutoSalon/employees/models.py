from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

# Create your models here.

class UserAccountManager(BaseUserManager): # class for creating users
    def create_user(self, email, name, password):
        if not email:
            raise ValueError('Users must have an email.')

        email = self.normalize_email(email)
        
        user = self.model(
            email=email,
            name=name
        )

        user.set_password(password) # to hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

    # methods for creating user roles:
    def create_sales_director(self, email, name, password):
        user = self.create_user(email, name, password)
        user.is_sales_director = True
        user.save(using=self._db)
        return user

    def create_sales_manager(self, email, name, password):
        user = self.create_user(email, name, password)
        user.is_sales_manager = True
        user.save(using=self._db)
        return user

    def create_puchase_manager(self, email, name, password):
        user = self.create_user(email, name, password)
        user.is_puchase_manager = True
        user.save(using=self._db)
        return user

    def create_tech_inspector(self, email, name, password):
        user = self.create_user(email, name, password)
        user.is_tech_inspector = True
        user.save(using=self._db)
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    # basic:
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # user role fields:
    is_sales_director = models.BooleanField(default=False)
    is_sales_manager = models.BooleanField(default=False)
    is_puchase_manager = models.BooleanField(default=False)
    is_tech_inspector = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self): 
        return f'{self.email}, {self.name}'