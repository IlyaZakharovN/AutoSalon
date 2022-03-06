# AutoSalon

Проект выполняется в рамках ВКР.
Цель проекта - разработка веб-приложения для автоматизации деятельности сотрудников автосалона.

Бекэнд - Django (+Django REST Framework + логин через Simple JWT) + PostgreSQL; 
Фронтенд - React + Redux Tooltik + Redux Persist

Предполагаются следующие роли пользователей:
1) Директор
![UML_use_case_director](https://user-images.githubusercontent.com/95462920/156708607-1f98ded8-8cc9-448c-af9f-c14b7bd43da0.png)

2) Менеджер по продажам
![UML_use_case_sales_manger](https://user-images.githubusercontent.com/95462920/156708649-ed4aa2ed-8861-4d7c-b4cb-eda9b3c20851.png)

3) Менеджер по закупкам
![UML_use_case_purchase_manger](https://user-images.githubusercontent.com/95462920/156708672-c425bd84-a610-4bf0-a4b0-682a90c60309.png)

4) Технический инспектор 
![UML_use_case_tech_inspector](https://user-images.githubusercontent.com/95462920/156708678-a346826a-c70e-4151-8bfd-597c11f80502.png)

5) Клиент
![UML_use_case_client](https://user-images.githubusercontent.com/95462920/156708723-ef92b225-ef50-42e5-a2e5-6b297a5ee229.png)


Описание БП:
1) Приемка ТС в автосалон
![BPMN_car_acceptance](https://user-images.githubusercontent.com/95462920/156708795-5531ad52-3c58-4ac4-a831-135ed98f6626.png)

2) Продажа ТС
![BPMN_sale](https://user-images.githubusercontent.com/95462920/156708822-8a52fa89-4ed9-4c35-8b79-2689d37ac317.png)

3) Техосмотр ТС
![BPMN_tech_inspection](https://user-images.githubusercontent.com/95462920/156708871-605c13da-0690-4925-a266-8df25971bd85.png)

4) Проведение тест-драйва
![BPMN_testdrive](https://user-images.githubusercontent.com/95462920/156708913-b31523be-c1ad-41d2-92fb-051fce90f427.png)
