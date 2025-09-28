import { Request, Response } from 'express';
declare class MessagesController {
    getAllMessages(req: Request, res: Response): Promise<void>;
    SendMessage(req: Request, res: Response): Promise<void>;
    deleteMessage(req: Request, res: Response): Promise<void>;
}
declare const _default: MessagesController;
export default _default;
//# sourceMappingURL=messagesController.d.ts.map