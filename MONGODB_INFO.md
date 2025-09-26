# MongoDB Configuration для ESDK Group Test API

## 🗄️ Локальная MongoDB

### **Основные пути:**

- **Данные**: `/Users/macbook/mongodb-data`
- **Порт**: `27017`
- **URI**: `mongodb://localhost:27017/esdk_group_test`
- **База данных**: `esdk_group_test`

### **Команды для управления:**

#### Запуск MongoDB:

```bash
# Запуск с кастомным путем данных
mongod --dbpath /Users/macbook/mongodb-data --port 27017

# Запуск в фоновом режиме
mongod --dbpath /Users/macbook/mongodb-data --port 27017 --logpath /Users/macbook/mongodb-data/mongodb.log --fork
```

#### Подключение к MongoDB:

```bash
# Подключение через mongosh
mongosh mongodb://localhost:27017/esdk_group_test

# Или просто
mongosh
```

#### Проверка статуса:

```bash
# Проверка процессов MongoDB
ps aux | grep mongod

# Проверка портов
lsof -i :27017
```

## 🐳 Docker MongoDB

### **Docker Compose конфигурация:**

```yaml
mongodb:
  image: mongo:7.0
  ports:
    - "27017:27017"
  environment:
    - MONGO_INITDB_ROOT_USERNAME=admin
    - MONGO_INITDB_ROOT_PASSWORD=password
  volumes:
    - mongodb_data:/data/db
```

### **Запуск через Docker:**

```bash
# Запуск MongoDB контейнера
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:7.0

# Или через docker-compose
docker-compose up mongodb
```

## 🔧 Настройки приложения

### **Переменные окружения:**

```env
MONGODB_URI=mongodb://localhost:27017/esdk_group_test
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=esdk_group_test
```

### **Подключение в коде:**

```typescript
import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017/esdk_group_test";
await mongoose.connect(mongoURI);
```

## 📊 Управление данными

### **Создание коллекции:**

```javascript
use esdk_group_test;
db.createCollection('messages');
```

### **Добавление тестовых данных:**

```javascript
db.messages.insertOne({
  phoneNumber: "+375291234567",
  message: "Test message",
  createdAt: new Date(),
});
```

### **Просмотр данных:**

```javascript
db.messages.find().pretty();
```

## 🚀 Готовые команды

### **Полный запуск:**

```bash
# 1. Запуск MongoDB
mongod --dbpath /Users/macbook/mongodb-data --port 27017 --fork

# 2. Запуск приложения
yarn dev

# 3. Проверка API
curl http://localhost:3001/v1/health
```

### **Остановка:**

```bash
# Остановка MongoDB
pkill mongod

# Остановка приложения
pkill -f "yarn dev"
```

## 📍 Текущий статус:

- ✅ MongoDB запущена на порту 27017
- ✅ Данные хранятся в `/Users/macbook/mongodb-data`
- ✅ API работает на порту 3001
- ✅ База данных: `esdk_group_test`
- ✅ Подключение установлено
