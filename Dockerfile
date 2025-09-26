# Используем официальный Node.js образ как базовый
FROM node:18-alpine AS base

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Этап для разработки
FROM base AS development
# Копируем исходный код
COPY . .
# Открываем порт
EXPOSE 3000
# Запускаем в режиме разработки
CMD ["yarn", "dev"]

# Этап для сборки
FROM base AS build
# Копируем исходный код
COPY . .
# Собираем TypeScript
RUN yarn build
# Удаляем dev зависимости
RUN yarn install --production --frozen-lockfile

# Продакшн этап
FROM node:18-alpine AS production

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из build этапа
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --from=build --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/package.json ./package.json

# Переключаемся на пользователя nodejs
USER nodejs

# Открываем порт
EXPOSE 3000

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=3000

# Запускаем приложение
CMD ["node", "dist/index.js"]
