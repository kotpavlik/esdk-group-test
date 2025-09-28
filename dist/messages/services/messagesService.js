"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messagesSchema_1 = __importDefault(require("../../db/models/messagesSchema"));
class MessagesService {
    async getAllMessages() {
        try {
            const messages = await messagesSchema_1.default.find()
                .sort({ createdAt: -1 })
                .limit(100);
            return messages;
        }
        catch (error) {
            throw new Error(`Ошибка получения сообщений: ${error}`);
        }
    }
    async SendMessage(messageData) {
        try {
            const newMessage = new messagesSchema_1.default({
                phoneNumber: messageData.phoneNumber,
                message: messageData.message
            });
            const savedMessage = await newMessage.save();
            return savedMessage;
        }
        catch (error) {
            throw new Error(`Ошибка сохранения сообщения: ${error}`);
        }
    }
    async deleteMessage(id) {
        try {
            const result = await messagesSchema_1.default.findByIdAndDelete(id);
            if (!result) {
                throw new Error('Сообщение не найдено');
            }
            return { message: "Сообщение удалено", id: id };
        }
        catch (error) {
            throw new Error(`Ошибка удаления сообщения: ${error}`);
        }
    }
    async getMessageById(id) {
        try {
            return await messagesSchema_1.default.findById(id);
        }
        catch (error) {
            throw new Error(`Ошибка получения сообщения: ${error}`);
        }
    }
}
exports.default = new MessagesService();
//# sourceMappingURL=messagesService.js.map