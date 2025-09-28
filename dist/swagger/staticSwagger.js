"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticSwaggerSpec = void 0;
exports.staticSwaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'ESDK Group Test API',
        description: 'This application serves for ESDK Group test',
        version: '1.0.0',
        contact: {
            name: 'Igor Anufriev',
            email: 'developers@esdkgroup.com'
        }
    },
    servers: [
        {
            url: process.env.NODE_ENV === 'development'
                ? 'http://localhost:3001/v1'
                : 'https://esdk-group-test-production.up.railway.app/v1',
            description: process.env.NODE_ENV === 'development' ? 'Development server' : 'Production server'
        }
    ],
    tags: [
        {
            name: 'Messages',
            description: 'Управление сообщениями'
        }
    ],
    paths: {
        '/api/messages': {
            get: {
                summary: 'Получить все сообщения',
                description: 'Возвращает список всех сообщений, отсортированных по дате создания',
                tags: ['Messages'],
                responses: {
                    '200': {
                        description: 'Список сообщений получен успешно',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                                                    phoneNumber: { type: 'string', example: '+375291234567' },
                                                    message: { type: 'string', example: 'Тестовое сообщение' },
                                                    createdAt: { type: 'string', format: 'date-time' },
                                                    updatedAt: { type: 'string', format: 'date-time' }
                                                }
                                            }
                                        },
                                        count: { type: 'number', example: 5 }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Внутренняя ошибка сервера',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: false },
                                        error: { type: 'string', example: 'Internal server error' }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                summary: 'Создать новое сообщение',
                description: 'Создает новое сообщение с номером телефона и текстом',
                tags: ['Messages'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['phoneNumber', 'message'],
                                properties: {
                                    phoneNumber: {
                                        type: 'string',
                                        example: '+375291234567',
                                        description: 'Белорусский номер телефона (международный или внутренний формат)',
                                        pattern: '^(\\+375|8)((25|29|33|44)\\d{7}|(17|162|212|232|152|222)\\d{6,7})$'
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Тестовое сообщение',
                                        description: 'Текст сообщения',
                                        minLength: 1,
                                        maxLength: 1000
                                    }
                                }
                            },
                            examples: {
                                mobile: {
                                    summary: 'Мобильный номер',
                                    value: {
                                        phoneNumber: '+375291234567',
                                        message: 'Тестовое сообщение'
                                    }
                                },
                                internal: {
                                    summary: 'Внутренний формат',
                                    value: {
                                        phoneNumber: '80291234567',
                                        message: 'Тестовое сообщение'
                                    }
                                },
                                landline: {
                                    summary: 'Стационарный номер',
                                    value: {
                                        phoneNumber: '80171234567',
                                        message: 'Тестовое сообщение'
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Сообщение создано успешно',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                                                phoneNumber: { type: 'string', example: '+375291234567' },
                                                message: { type: 'string', example: 'Тестовое сообщение' },
                                                createdAt: { type: 'string', format: 'date-time' },
                                                updatedAt: { type: 'string', format: 'date-time' }
                                            }
                                        },
                                        message: { type: 'string', example: 'Сообщение успешно отправлено' }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Ошибка валидации',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: false },
                                        error: { type: 'string', example: 'Номер телефона должен быть белорусским' }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Внутренняя ошибка сервера',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: false },
                                        error: { type: 'string', example: 'Internal server error' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/api/messages/{id}': {
            delete: {
                summary: 'Удалить сообщение',
                description: 'Удаляет сообщение по его ID',
                tags: ['Messages'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID сообщения',
                        schema: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Сообщение удалено успешно',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                message: { type: 'string', example: 'Сообщение удалено' },
                                                id: { type: 'string', example: '507f1f77bcf86cd799439011' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Неверный ID сообщения',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: false },
                                        error: { type: 'string', example: 'Invalid message ID' }
                                    }
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Сообщение не найдено',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: false },
                                        error: { type: 'string', example: 'Message not found' }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Внутренняя ошибка сервера',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: false },
                                        error: { type: 'string', example: 'Internal server error' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=staticSwagger.js.map