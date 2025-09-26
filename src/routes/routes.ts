import { Router } from "express";
import MessagesController from "../messages/controllers/messagesController";
import './swagger'; // Импортируем Swagger документацию

const router = Router();

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Получить все сообщения
 *     tags: [Messages]
 */
router.get("/api/messages", MessagesController.getAllMessages);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Создать новое сообщение
 *     tags: [Messages]
 */
router.post("/api/messages", MessagesController.SendMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Удалить сообщение
 *     tags: [Messages]
 */
router.delete("/api/messages/:id", MessagesController.deleteMessage);

export default router;