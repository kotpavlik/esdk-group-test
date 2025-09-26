# Docker Setup для ESDK Group Test API

## 🐳 Docker Commands

### Сборка и запуск в продакшн режиме

```bash
# Сборка образа
docker build -t esdk-group-api .

# Запуск контейнера
docker run -p 3000:3000 esdk-group-api

# Или через docker-compose
docker-compose up --build
```

### Разработка с hot reload

```bash
# Запуск в режиме разработки
docker-compose --profile dev up --build

# Или только приложение для разработки
docker-compose up app-dev --build
```

### С базой данных

```bash
# Запуск с MongoDB
docker-compose --profile db up --build

# Только база данных
docker-compose up mongodb
```

## 📋 Доступные команды

### Основные команды

```bash
# Сборка образа
docker build -t esdk-group-api .

# Запуск контейнера
docker run -p 3000:3000 esdk-group-api

# Просмотр логов
docker logs <container_id>

# Вход в контейнер
docker exec -it <container_id> sh
```

### Docker Compose команды

```bash
# Запуск всех сервисов
docker-compose up

# Запуск в фоне
docker-compose up -d

# Остановка
docker-compose down

# Пересборка
docker-compose up --build

# Просмотр логов
docker-compose logs -f app
```

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `.env` с необходимыми переменными:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/esdk_group_test
```

### Порты

- **3000** - Основное приложение
- **27017** - MongoDB (если используется)

## 🚀 Production Deployment

### Сборка для продакшна

```bash
# Сборка только продакшн образа
docker build --target production -t esdk-group-api:prod .

# Запуск продакшн контейнера
docker run -d \
  --name esdk-api \
  -p 3000:3000 \
  -e NODE_ENV=production \
  esdk-group-api:prod
```

### Health Check

Приложение автоматически проверяет здоровье через:

```
GET http://localhost:3000/v1/health
```

## 📊 Мониторинг

### Просмотр статуса

```bash
# Статус контейнеров
docker-compose ps

# Использование ресурсов
docker stats

# Логи приложения
docker-compose logs -f app
```

## 🛠️ Troubleshooting

### Проблемы с портами

```bash
# Проверить занятые порты
lsof -i :3000

# Остановить контейнер
docker-compose down
```

### Проблемы с зависимостями

```bash
# Пересобрать без кеша
docker-compose build --no-cache

# Очистить все контейнеры и образы
docker system prune -a
```

## 📁 Структура файлов

```
├── Dockerfile              # Основной Docker файл
├── docker-compose.yml      # Docker Compose конфигурация
├── .dockerignore          # Исключения для Docker
└── DOCKER.md              # Эта документация
```
