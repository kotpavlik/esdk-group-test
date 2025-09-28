"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const phoneValidation_1 = require("../../utils/phoneValidation");
const MessageSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: [true, 'Номер телефона обязателен'],
        trim: true,
        validate: {
            validator: function (v) {
                return (0, phoneValidation_1.isBelarusPhoneNumber)(v);
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
exports.default = mongoose_1.default.model('Message', MessageSchema);
//# sourceMappingURL=messagesSchema.js.map