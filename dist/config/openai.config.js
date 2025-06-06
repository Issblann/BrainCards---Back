"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openaiConfig = void 0;
const openai_1 = __importDefault(require("openai"));
const env_1 = __importDefault(require("./env"));
exports.openaiConfig = new openai_1.default({
    apiKey: env_1.default.openaiKey,
    organization: env_1.default.openainOrgId,
});
//# sourceMappingURL=openai.config.js.map