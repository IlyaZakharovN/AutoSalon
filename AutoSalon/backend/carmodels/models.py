from django.db import models

# Create your models here.

class CarModel(models.Model):
    class BodyType(models.TextChoices):
        SEDAN = 'Седан'
        HATCHBACK_3 = 'Хэтчбек 3 дв.'
        HATCHBACK_5 = 'Хэтчбек 5 дв.'
        LIFTBACK = 'Лифтбек'
        SUV_3 = 'Внедорожник 3 дв.'
        SUV_5 = 'Внедорожник 5 дв.'
        SW = 'Универсал'
        COUPE = 'Купе'
        MINIVAN = 'Минивэн'
        PICKUP_TRUCK = 'Пикап'
        LIMOUSINE = 'Лимузин'
        VAN = 'Фургон'
        CABRIOLET = 'Кабриолет'
        UNKNOWN = 'Неизвестно'

    class FuelType(models.TextChoices):
        PETROL = 'Бензин'
        DIESEL = 'Дизель'
        HYBRID = 'Гибрид'
        ELECTRO = 'Электро'
        UNKNOWN = 'Неизвестно'

    class TransmissionType(models.TextChoices):
        AUTOMATIC = 'Автоматическая'
        ROBOT = 'Робот'
        VARIATOR = 'Вариатор'
        MANUAL = 'Механическая'
        UNKNOWN = 'Неизвестно'

    class DriveUnitType(models.TextChoices):
        FWD = 'Передний'
        RWD = 'Задний'
        AWD = 'Полный'
        UNKNOWN = 'Неизвестно'

    brand = models.CharField(max_length=255) # , null=False, blank=False
    model = models.CharField(max_length=255)
    year = models.PositiveSmallIntegerField()
    body = models.CharField(max_length=30, choices=BodyType.choices, default=BodyType.SEDAN)
    engine_volume = models.DecimalField(max_digits=3, decimal_places=2)
    engine_power = models.PositiveSmallIntegerField()
    fuel_type = models.CharField(max_length=30, choices=FuelType.choices, default=FuelType.PETROL)
    transmission_type = models.CharField(max_length=30, choices=TransmissionType.choices, default=TransmissionType.AUTOMATIC)
    drive_unit = models.CharField(max_length=30, choices=DriveUnitType.choices, default=DriveUnitType.FWD)
    package_name = models.CharField(max_length=255)
    package_descr = models.TextField(default='Подробное описание комплектации не найдено.')
    price = models.DecimalField(max_digits=11, decimal_places=2)
    main_photo = models.ImageField(upload_to='car_models/')
    # add multiple images later
    model_descr = models.TextField(default='Подробное описание модели не найдено.')

    def __str__(self):
        return f'{self.id} - {self.brand} {self.model} {self.year}, {self.fuel_type} {self.engine_volume} л., {self.engine_power} л.с. в комплектации {self.package_name} - {self.price} руб.'