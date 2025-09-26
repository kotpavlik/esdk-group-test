import Message, { IMessage } from '../../db/models/messagesSchema';

class MessagesService {
    async getAllMessages(): Promise<IMessage[]> {
        try {
            const messages = await Message.find()
                .sort({ createdAt: -1 })
                .limit(100); // Ограничиваем количество сообщений
            return messages;
        } catch (error) {
            throw new Error(`Ошибка получения сообщений: ${error}`);
        }
    }

    async SendMessage(messageData: { phoneNumber: string; message: string }): Promise<IMessage> {
        try {
            const newMessage = new Message({
                phoneNumber: messageData.phoneNumber,
                message: messageData.message
            });
            
            const savedMessage = await newMessage.save();
            return savedMessage;
        } catch (error) {
            throw new Error(`Ошибка сохранения сообщения: ${error}`);
        }
    }

    async deleteMessage(id: string): Promise<{ message: string; id: string }> {
        try {
            const result = await Message.findByIdAndDelete(id);
            if (!result) {
                throw new Error('Сообщение не найдено');
            }
            return { message: "Сообщение удалено", id: id };
        } catch (error) {
            throw new Error(`Ошибка удаления сообщения: ${error}`);
        }
    }

    async getMessageById(id: string): Promise<IMessage | null> {
        try {
            return await Message.findById(id);
        } catch (error) {
            throw new Error(`Ошибка получения сообщения: ${error}`);
        }
    }
}

export default new MessagesService();