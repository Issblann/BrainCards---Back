"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpecs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const env_1 = __importDefault(require("../config/env"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Brain Cards API documentation',
            version: '1.0.0',
            description: 'API documentation for Brain Cards',
        },
        servers: [{ url: `${env_1.default.base_url}/` }],
    },
    apis: ['./src/routes/*.ts'],
};
exports.swaggerSpecs = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map