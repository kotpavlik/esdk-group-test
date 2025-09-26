# ESDK Group Test API - Docker Commands

.PHONY: help build dev prod clean logs shell test

# Показать помощь
help:
	@echo "Доступные команды:"
	@echo "  make build     - Собрать Docker образ"
	@echo "  make dev       - Запустить в режиме разработки"
	@echo "  make prod      - Запустить в продакшн режиме"
	@echo "  make clean     - Очистить Docker контейнеры и образы"
	@echo "  make logs      - Показать логи приложения"
	@echo "  make shell     - Войти в контейнер"
	@echo "  make test      - Запустить тесты"

# Сборка образа
build:
	docker build -t esdk-group-api .

# Разработка
dev:
	docker-compose --profile dev up --build

# Продакшн
prod:
	docker-compose up --build

# Очистка
clean:
	docker-compose down
	docker system prune -f
	docker rmi esdk-group-api 2>/dev/null || true

# Логи
logs:
	docker-compose logs -f app

# Вход в контейнер
shell:
	docker-compose exec app sh

# Тесты
test:
	docker-compose exec app yarn test

# Остановка
stop:
	docker-compose down
