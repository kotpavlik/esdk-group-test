/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - message
 *       properties:
 *         _id:
 *           type: string
 *           description: Уникальный идентификатор сообщения
 *           example: "507f1f77bcf86cd799439011"
 *         phoneNumber:
 *           type: string
 *           description: Белорусский номер телефона
 *           example: "+375291234567"
 *           pattern: "^\\+375((25|29|33|44)\\d{7}|(17|162|212|232|152|222)\\d{7})$"
 *           enum: ["+37525", "+37529", "+37533", "+37544", "+37517", "+375162", "+375212", "+375232", "+375152", "+375222"]
 *         message:
 *           type: string
 *           description: Текст сообщения
 *           example: "Привет! Это тестовое сообщение"
 *           minLength: 1
 *           maxLength: 1000
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания
 *           example: "2024-01-15T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Дата обновления
 *           example: "2024-01-15T10:30:00.000Z"
 *     
 *     MessageRequest:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - message
 *       properties:
 *         phoneNumber:
 *           type: string
 *           description: Белорусский номер телефона (обязательно)
 *           example: "+375291234567"
 *           pattern: "^\\+375((25|29|33|44)\\d{7}|(17|162|212|232|152|222)\\d{7})$"
 *         message:
 *           type: string
 *           description: Текст сообщения (обязательно)
 *           example: "Привет! Это тестовое сообщение"
 *           minLength: 1
 *           maxLength: 1000
 *     
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Статус операции
 *         data:
 *           type: object
 *           description: Данные ответа
 *         message:
 *           type: string
 *           description: Сообщение о результате
 *         error:
 *           type: string
 *           description: Описание ошибки
 *         count:
 *           type: number
 *           description: Количество элементов (для списков)
 *   
 *   parameters:
 *     MessageId:
 *       name: id
 *       in: path
 *       required: true
 *       description: ID сообщения
 *       schema:
 *         type: string
 *         example: "507f1f77bcf86cd799439011"
 */

/**
 * @swagger
 * tags:
 *   - name: Messages
 *     description: Управление сообщениями
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Получить все сообщения
 *     description: Возвращает список всех сообщений, отсортированных по дате создания
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Список сообщений получен успешно
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Message'
 *                     count:
 *                       type: number
 *                       example: 5
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *   
 *   post:
 *     summary: Создать новое сообщение
 *     description: Создает новое сообщение с номером телефона и текстом
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageRequest'
 *           examples:
 *             example1:
 *               summary: Пример с мобильным номером МТС
 *               value:
 *                 phoneNumber: "+375291234567"
 *                 message: "Привет! Это тестовое сообщение"
 *             example2:
 *               summary: Пример с номером life:)
 *               value:
 *                 phoneNumber: "+375251234567"
 *                 message: "Тестовое сообщение для life:)"
 *             example3:
 *               summary: Пример со стационарным номером Минска
 *               value:
 *                 phoneNumber: "+375171234567"
 *                 message: "Тестовое сообщение для стационарного номера"
 *     responses:
 *       201:
 *         description: Сообщение создано успешно
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Message'
 *                     message:
 *                       type: string
 *                       example: "Сообщение успешно отправлено"
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Удалить сообщение
 *     description: Удаляет сообщение по его ID
 *     tags: [Messages]
 *     parameters:
 *       - $ref: '#/components/parameters/MessageId'
 *     responses:
 *       200:
 *         description: Сообщение удалено успешно
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         message:
 *                           type: string
 *                           example: "Сообщение удалено"
 *                         id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439011"
 *       400:
 *         description: Неверный ID сообщения
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Сообщение не найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
