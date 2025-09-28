import mongoose, { Schema, Document } from 'mongoose';
import { isBelarusPhoneNumber } from '../../utils/phoneValidation';

export interface IMessage extends Document {
  phoneNumber: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema({
  phoneNumber: {
    type: String,
    required: [true, 'Номер телефона обязателен'],
    trim: true,
    validate: {
      validator: function(v: string) {
        return isBelarusPhoneNumber(v);
      },
      message: 'Номер телефона должен быть белорусским. Поддерживаются форматы: +375XXXXXXXXX или 8-0XX-XXX-XXXX'
    }
  },
  message: {
    type: String,
    required: [true, 'Сообщение обязательно'],
    trim: true,
    minlength: [3, 'Сообщение не может быть пустым'],
    maxlength: [1000, 'Сообщение слишком длинное (максимум 1000 символов)']
  }
}, {
  timestamps: true, 
  versionKey: false
});

MessageSchema.index({ phoneNumber: 1 });
MessageSchema.index({ createdAt: -1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
