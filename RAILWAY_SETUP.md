# Railway Deployment Setup

## 🚀 Настройка Railway для ESDK Group Test API

### 1. Создание MongoDB сервиса в Railway

1. **Перейдите в Railway Dashboard**
2. **Создайте новый проект** или используйте существующий
3. **Добавьте MongoDB сервис:**
   - Нажмите "New Service"
   - Выберите "Database" → "MongoDB"
   - Дождитесь создания сервиса

### 2. Настройка переменных окружения

В панели Railway → Variables добавьте:

```env
NODE_ENV=production
PORT=3001
MONGO_URL=mongodb://mongo:password@gondola.proxy.rlwy.net:23948
BASE_URL_PROD=https://your-app-name.up.railway.app
USER_URL=https://your-app-name.up.railway.app
```

**Важно:** Используйте внешний connection string для `MONGO_URL` (не внутренний `.railway.internal`).

### 3. Получение MongoDB connection string

1. **Перейдите в MongoDB сервис** в Railway
2. **Скопируйте connection string** из вкладки "Connect"
3. **Добавьте его в переменную MONGO_URL**

### 4. Проверка подключения

После деплоя проверьте логи:

- ✅ `🗄️ MongoDB Connected: <host>`
- ✅ `📊 Database: <database_name>`
- ✅ `🌍 Environment: production`

### 5. Возможные проблемы

#### Проблема: `getaddrinfo ENOTFOUND mongodb-xxx.railway.internal`

**Решение:**

1. Убедитесь, что MongoDB сервис запущен
2. Проверьте правильность connection string
3. Убедитесь, что переменная `MONGO_URL` установлена

#### Проблема: `MongooseServerSelectionError`

**Решение:**

1. Проверьте, что MongoDB сервис доступен
2. Убедитесь, что connection string содержит правильные credentials
3. Проверьте, что порт 27017 открыт

### 6. Тестирование API

После успешного деплоя:

```bash
# Health check
curl https://your-app-name.up.railway.app/v1/health

# Test message creation
curl -X POST https://your-app-name.up.railway.app/v1/api/messages \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+375441234567", "message": "Test from Railway"}'
```

### 7. Мониторинг

- **Логи:** Railway Dashboard → Deployments → Logs
- **Метрики:** Railway Dashboard → Metrics
- **База данных:** Railway Dashboard → MongoDB service

## 🔧 Troubleshooting

### Если MongoDB не подключается:

1. **Проверьте статус сервиса** в Railway Dashboard
2. **Перезапустите сервис** если необходимо
3. **Проверьте переменные окружения**
4. **Убедитесь, что connection string правильный**

### Если API не отвечает:

1. **Проверьте логи** на ошибки
2. **Убедитесь, что порт 3001 открыт**
3. **Проверьте CORS настройки**
4. **Убедитесь, что все зависимости установлены**
