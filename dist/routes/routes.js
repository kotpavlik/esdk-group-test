"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messagesController_1 = __importDefault(require("../messages/controllers/messagesController"));
require("./swagger");
const router = (0, express_1.Router)();
router.get("/api/messages", messagesController_1.default.getAllMessages);
router.post("/api/messages", messagesController_1.default.SendMessage);
router.delete("/api/messages/:id", messagesController_1.default.deleteMessage);
exports.default = router;
//# sourceMappingURL=routes.js.map