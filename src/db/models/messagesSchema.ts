import mongoose, { Schema, Document } from 'mongoose';

// Интерфейс для сообщения
export interface IMessage extends Document {
  phoneNumber: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// Схема сообщения
const MessageSchema: Schema = new Schema({
  phoneNumber: {
    type: String,
    required: [true, 'Номер телефона обязателен'],
    trim: true,
    validate: {
      validator: function(v: string) {
        // Валидация белорусского номера телефона
        // Мобильные операторы: 25 (life:), 29 (A1/МТС), 33 (МТС), 44 (A1)
        const mobileRegex = /^\+375(25|29|33|44)\d{7}$/;
        // Стационарные номера: 17 (Минск), 162 (Брест), 212 (Витебск), 232 (Гомель), 152 (Гродно), 222 (Могилев)
        const landlineRegex = /^\+375(17|162|212|232|152|222)\d{7}$/;
        return mobileRegex.test(v) || landlineRegex.test(v);
      },
      message: 'Номер телефона должен быть белорусским. Мобильные: +375(25|29|33|44)XXXXXXX, Стационарные: +375(17|162|212|232|152|222)XXXXXXX'
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
  timestamps: true, // Автоматически добавляет createdAt и updatedAt
  versionKey: false
});

// Индексы для оптимизации поиска
MessageSchema.index({ phoneNumber: 1 });
MessageSchema.index({ createdAt: -1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
