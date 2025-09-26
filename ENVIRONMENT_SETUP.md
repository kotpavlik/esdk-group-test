# Настройка окружений для ESDK Group Test API

## 🔧 Переменные окружения

### **Файл .env:**

```env
# Server Configuration
PORT=3001
USER_URL=
NODE_ENV=development

# MongoDB Configuration
MONGO_LOCAL=mongodb://localhost:27017/esdk_group_test
MONGO_URL=mongodb://localhost:27017/esdk_group_test_prod
```

## 🌍 Режимы работы

### **Development режим (NODE_ENV=development):**

- **Подключение**: `MONGO_LOCAL`
- **База данных**: `esdk_group_test`
- **URI**: `mongodb://localhost:27017/esdk_group_test`
- **Использование**: Локальная разработка

### **Production режим (NODE_ENV=production):**

- **Подключение**: `MONGO_URL`
- **База данных**: `esdk_group_test_prod`
- **URI**: `mongodb://localhost:27017/esdk_group_test_prod`
- **Использование**: Продакшн окружение

## 🚀 Команды для переключения

### **Переключение на Development:**

```bash
# Изменить в .env файле
NODE_ENV=development

# Или через команду
sed -i '' 's/NODE_ENV=production/NODE_ENV=development/' .env
```

### **Переключение на Production:**

```bash
# Изменить в .env файле
NODE_ENV=production

# Или через команду
sed -i '' 's/NODE_ENV=development/NODE_ENV=production/' .env
```

## 🧪 Тестирование окружений

### **Проверка текущего режима:**

```bash
# Запуск тестового скрипта
node test-env.js

# Или проверка переменных
echo $NODE_ENV
```

### **Логи подключения:**

При запуске приложения вы увидите:

```
🗄️  MongoDB Connected: localhost
📊 Database: esdk_group_test
🔗 URI: mongodb://localhost:27017/esdk_group_test
🌍 Environment: development
📍 Connection Type: LOCAL (MONGO_LOCAL)
```

## 📊 Структура баз данных

### **Development база:**

- **Название**: `esdk_group_test`
- **Коллекция**: `messages`
- **Данные**: Тестовые данные для разработки

### **Production база:**

- **Название**: `esdk_group_test_prod`
- **Коллекция**: `messages`
- **Данные**: Продакшн данные

## 🔄 Автоматическое переключение

### **В коде приложения:**

```typescript
// src/config/database.ts
const getMongoURI = (): string => {
  const nodeEnv = process.env.NODE_ENV || "development";

  if (nodeEnv === "development") {
    return (
      process.env.MONGO_LOCAL || "mongodb://localhost:27017/esdk_group_test"
    );
  } else {
    return (
      process.env.MONGO_URL || "mongodb://localhost:27017/esdk_group_test_prod"
    );
  }
};
```

## 🐳 Docker окружения

### **Development Docker:**

```yaml
environment:
  - NODE_ENV=development
  - MONGO_LOCAL=mongodb://mongodb:27017/esdk_group_test
```

### **Production Docker:**

```yaml
environment:
  - NODE_ENV=production
  - MONGO_URL=mongodb://mongodb:27017/esdk_group_test_prod
```

## ✅ Текущий статус:

- ✅ Development режим: `MONGO_LOCAL` → `esdk_group_test`
- ✅ Production режим: `MONGO_URL` → `esdk_group_test_prod`
- ✅ Автоматическое переключение по `NODE_ENV`
- ✅ Логирование типа подключения
- ✅ Готово к использованию
