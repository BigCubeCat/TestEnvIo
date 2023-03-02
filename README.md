# TestEnv.io

## Посмотреть

http://bigcubecat.ru

## Запуск
```bash
docker-compose build
docker-compose up

```

Если фронтенд на 80 порту не появился, то

```bash
cd frontend
docker build -t web:0.1.0 .
docker run --rm --name web-1 -p 80:80 -d web:0.1.0
```

Если все еще проблемы то:
```bash
cd frontend
yarn
yarn run dev
```
### Создайте администратора, который сможет создать пользователей
для этого сделайте POST-запрос на 

http://localhost:8000/accounts/

```json
{
  "username": "root",
  "first_name": "super",
  "last_name": "user",
  "middle_name": null,
  "password": "password",
  "is_admin": true
}
```
Админ может быть только один
