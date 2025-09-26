# Environment Variables Configuration

## 📋 **Переменные окружения для ESDK Group Test API**

### **Development (.env файл)**

```env
# Environment Configuration
NODE_ENV=development

# Port Configuration
PORT=3001

# Base URLs
BASE_URL_LOCAL=http://localhost:3001
BASE_URL_PROD=https://esdk-group-test-production.up.railway.app

# MongoDB Configuration
# Для development (локальная база)
MONGO_LOCAL=mongodb://localhost:27017/esdk_group_test

# Для production (Railway база)
MONGO_URL=mongodb://mongo:oNUVlgDtJkgLsPxpKlhiPtPNVPIfwLCp@gondola.proxy.rlwy.net:23948

# User URL for CORS
USER_URL=http://localhost:3001
```

### **Production (Railway Variables)**

```env
NODE_ENV=production
PORT=3001
MONGO_URL=mongodb://mongo:password@gondola.proxy.rlwy.net:23948
BASE_URL_PROD=https://esdk-group-test-production.up.railway.app
USER_URL=https://esdk-group-test-production.up.railway.app
```

## 🔧 **Логика выбора базы данных**

```typescript
// Аналогично NestJS конфигурации
if (process.env.NODE_ENV === "production") {
  return process.env.MONGO_URL; // Railway MongoDB
} else {
  return process.env.MONGO_LOCAL; // Локальная MongoDB
}
```

## 📊 **Структура переменных**

| Переменная       | Development                                 | Production                                              | Описание             |
| ---------------- | ------------------------------------------- | ------------------------------------------------------- | -------------------- |
| `NODE_ENV`       | `development`                               | `production`                                            | Окружение приложения |
| `PORT`           | `3001`                                      | `3001`                                                  | Порт приложения      |
| `MONGO_LOCAL`    | `mongodb://localhost:27017/esdk_group_test` | -                                                       | Локальная MongoDB    |
| `MONGO_URL`      | -                                           | `mongodb://mongo:password@gondola.proxy.rlwy.net:23948` | Railway MongoDB      |
| `BASE_URL_LOCAL` | `http://localhost:3001`                     | -                                                       | Локальный URL        |
| `BASE_URL_PROD`  | -                                           | `https://esdk-group-test-production.up.railway.app`     | Production URL       |
| `USER_URL`       | `http://localhost:3001`                     | `https://esdk-group-test-production.up.railway.app`     | CORS URL             |

## 🚀 **Настройка для Railway**

1. **Перейдите в Railway Dashboard**
2. **Откройте ваш проект**
3. **Перейдите в Variables**
4. **Добавьте переменные:**

```env
NODE_ENV=production
PORT=3001
MONGO_URL=mongodb://mongo:oNUVlgDtJkgLsPxpKlhiPtPNVPIfwLCp@gondola.proxy.rlwy.net:23948
BASE_URL_PROD=https://esdk-group-test-production.up.railway.app
USER_URL=https://esdk-group-test-production.up.railway.app
```

## 🔍 **Проверка подключения**

### **Development:**

```
🔗 URI: mongodb://localhost:27017/esdk_group_test
🌍 Environment: development
📍 Connection Type: LOCAL (MONGO_LOCAL)
```

### **Production:**

```
🔗 URI: mongodb://mongo:password@gondola.proxy.rlwy.net:23948
🌍 Environment: production
📍 Connection Type: PRODUCTION (MONGO_URL)
```

## ⚠️ **Важные моменты**

1. **Используйте внешний connection string** для Railway (не `.railway.internal`)
2. **Убедитесь, что MongoDB сервис запущен** в Railway
3. **Проверьте права доступа** к базе данных
4. **Перезапустите приложение** после изменения переменных
