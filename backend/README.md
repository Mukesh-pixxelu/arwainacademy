# Arwain Academy backend

Laravel admin + student portal for the Arwain Academy website.

## Database (MAMP MySQL)

Create database `arwainacademy` (or run the SQL below), then:

```bash
cd backend
php artisan migrate --seed
php artisan serve
```

```sql
CREATE DATABASE arwainacademy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

MAMP defaults used: host `127.0.0.1`, port `3307`, user `root`, password `root`.

Open http://localhost:8000

## Logins

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@arwainacademy.com | password |
| Student | molly@example.com | password |

New students can also use **Register**.

## What is included

- Login / registration
- Admin dashboard with pie + bar charts
- Course add / edit / delete (title, image, description, price)
- Student management list
- Student dashboard
