# CORS Configuration for Railway

## 🚀 **Настройка CORS для Railway Production**

### **Проблема**

```
Access to XMLHttpRequest at 'https://esdk-group-test-production.up.railway.app/v1/api/messages'
from origin 'https://esdk-group-front-test.vercel.app' has been blocked by CORS policy:
Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

### **Решение**

#### **1. Переменные окружения в Railway**

В панели Railway → Variables добавьте:

```env
NODE_ENV=production
PORT=3001
MONGO_URL=mongodb://mongo:password@gondola.proxy.rlwy.net:23948
BASE_URL_PROD=https://esdk-group-test-production.up.railway.app
USER_URL=https://esdk-group-front-test.vercel.app
```

#### **2. CORS конфигурация в коде**

```typescript
// src/index.ts
const corsOrigins: string[] =
  NODE_ENV === "development"
    ? [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:3001",
      ]
    : ([
        "https://esdk-group-test-production.up.railway.app",
        "https://esdk-group-front-test.vercel.app",
        process.env.USER_URL,
      ].filter(Boolean) as string[]);

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200,
  })
);
```

### **3. Проверка CORS**

#### **Локальная проверка:**

```bash
curl -v -H "Origin: https://esdk-group-front-test.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS http://localhost:3001/v1/api/messages
```

**Ожидаемый ответ:**

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type,Authorization,X-Requested-With
```

#### **Production проверка:**

```bash
curl -v -H "Origin: https://esdk-group-front-test.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS https://esdk-group-test-production.up.railway.app/v1/api/messages
```

### **4. Поддерживаемые домены**

| Environment     | Allowed Origins                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------- |
| **Development** | `http://localhost:3000`<br>`http://localhost:5173`<br>`http://localhost:3001`                     |
| **Production**  | `https://esdk-group-test-production.up.railway.app`<br>`https://esdk-group-front-test.vercel.app` |

### **5. Отладка CORS**

#### **Проверка заголовков:**

```bash
# Проверка OPTIONS запроса
curl -I -X OPTIONS \
  -H "Origin: https://esdk-group-front-test.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  https://esdk-group-test-production.up.railway.app/v1/api/messages
```

#### **Проверка POST запроса:**

```bash
curl -X POST \
  -H "Origin: https://esdk-group-front-test.vercel.app" \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+375291234567", "message": "Test"}' \
  https://esdk-group-test-production.up.railway.app/v1/api/messages
```

### **6. Частые проблемы**

#### **Проблема 1: Лишний слэш в URL**

```typescript
// ❌ Неправильно
"https://esdk-group-front-test.vercel.app/";

// ✅ Правильно
"https://esdk-group-front-test.vercel.app";
```

#### **Проблема 2: Неправильный USER_URL**

```env
# ❌ Неправильно
USER_URL=https://esdk-group-test-production.up.railway.app

# ✅ Правильно
USER_URL=https://esdk-group-front-test.vercel.app
```

#### **Проблема 3: Отсутствие OPTIONS метода**

```typescript
// ✅ Убедитесь, что включены все методы
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"];
```

### **7. Логи для отладки**

В консоли Railway должны появиться:

```
🔗 CORS enabled for: https://esdk-group-test-production.up.railway.app, https://esdk-group-front-test.vercel.app
```

### **8. Тестирование с фронтенда**

```javascript
// Тест с фронтенда
fetch("https://esdk-group-test-production.up.railway.app/v1/api/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    phoneNumber: "+375291234567",
    message: "Test message",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("CORS Error:", error));
```

## ✅ **После настройки**

1. **Перезапустите приложение** в Railway
2. **Проверьте переменные окружения** в Railway Dashboard
3. **Протестируйте запросы** с фронтенда
4. **Проверьте логи** на наличие CORS ошибок

## 🔧 **Быстрое исправление**

Если проблема остается, добавьте в Railway Variables:

```env
USER_URL=https://esdk-group-front-test.vercel.app
```

И перезапустите приложение.
