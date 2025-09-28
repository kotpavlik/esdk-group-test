import { IMessage } from '../../db/models/messagesSchema';
declare class MessagesService {
    getAllMessages(): Promise<IMessage[]>;
    SendMessage(messageData: {
        phoneNumber: string;
        message: string;
    }): Promise<IMessage>;
    deleteMessage(id: string): Promise<{
        message: string;
        id: string;
    }>;
    getMessageById(id: string): Promise<IMessage | null>;
}
declare const _default: MessagesService;
export default _default;
//# sourceMappingURL=messagesService.d.ts.map