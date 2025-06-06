"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompletionFlashcards = void 0;
const openai_config_1 = require("../config/openai.config");
const createCompletionFlashcards = (systemMessage, userMessage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completion = yield openai_config_1.openaiConfig.chat.completions.create({
            model: 'gpt-4o-2024-08-06',
            messages: [
                { role: 'system', content: systemMessage },
                { role: 'user', content: userMessage },
            ],
            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: 'flashcards_schema',
                    schema: {
                        type: 'object',
                        properties: {
                            flashCards: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        question: {
                                            type: 'string',
                                            description: 'Pregunta clara que resuma la información clave sobre el tema y descripción proporcionada.',
                                        },
                                        answer: {
                                            type: 'string',
                                            description: 'Respuesta correspondiente a la pregunta, breve pero completa.',
                                        },
                                    },
                                    required: ['question', 'answer'],
                                },
                            },
                        },
                    },
                },
            },
        });
        return completion.choices[0].message.content;
    }
    catch (error) {
        console.error('Error getting completion ', error);
        throw error;
    }
});
exports.createCompletionFlashcards = createCompletionFlashcards;
//# sourceMappingURL=openai.utils.js.map