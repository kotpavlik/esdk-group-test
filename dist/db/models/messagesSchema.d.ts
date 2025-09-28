import mongoose, { Document } from 'mongoose';
export interface IMessage extends Document {
    phoneNumber: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage, {}, {}> & IMessage & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=messagesSchema.d.ts.map