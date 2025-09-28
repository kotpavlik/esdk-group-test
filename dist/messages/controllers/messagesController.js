"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messagesService_1 = __importDefault(require("../services/messagesService"));
const phoneValidation_1 = require("../../utils/phoneValidation");
class MessagesController {
    async getAllMessages(req, res) {
        try {
            const all_messages = await messagesService_1.default.getAllMessages();
            res.status(200).json({
                success: true,
                data: all_messages,
                count: all_messages.length
            });
        }
        catch (e) {
            res.status(500).json({
                success: false,
                error: e instanceof Error ? e.message : 'Неизвестная ошибка'
            });
        }
    }
    async SendMessage(req, res) {
        try {
            const { phoneNumber, message } = req.body;
            if (!phoneNumber || !message) {
                res.status(400).json({
                    success: false,
                    error: 'Номер телефона и сообщение обязательны'
                });
                return;
            }
            if (typeof phoneNumber !== 'string' || typeof message !== 'string') {
                res.status(400).json({
                    success: false,
                    error: 'Номер телефона и сообщение должны быть строками'
                });
                return;
            }
            if (message.trim().length === 0) {
                res.status(400).json({
                    success: false,
                    error: 'Сообщение не может быть пустым'
                });
                return;
            }
            if (!(0, phoneValidation_1.isBelarusPhoneNumber)(phoneNumber)) {
                res.status(400).json({
                    success: false,
                    error: 'Номер телефона должен быть белорусским. Мобильные: +375(25|29|33|44)XXXXXXX, Стационарные: +375(17|162|212|232|152|222)XXXXXXX'
                });
                return;
            }
            const data = await messagesService_1.default.SendMessage({ phoneNumber, message });
            res.status(201).json({
                success: true,
                data: data,
                message: 'Сообщение успешно отправлено'
            });
        }
        catch (e) {
            res.status(500).json({
                success: false,
                error: e instanceof Error ? e.message : 'Неизвестная ошибка'
            });
        }
    }
    async deleteMessage(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'ID сообщения обязателен'
                });
                return;
            }
            const data = await messagesService_1.default.deleteMessage(id);
            res.status(200).json({
                success: true,
                data: data
            });
        }
        catch (e) {
            res.status(500).json({
                success: false,
                error: e instanceof Error ? e.message : 'Неизвестная ошибка'
            });
        }
    }
}
exports.default = new MessagesController();
//# sourceMappingURL=messagesController.js.map