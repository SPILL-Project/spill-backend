"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const registerValidation = (data) => {
    const schema = joi_1.default.object({
        fullname: joi_1.default.string().min(6).required(),
        username: joi_1.default.string().required(),
        password: joi_1.default.string().min(6).required(),
        phone: joi_1.default.string().min(6).required(),
    });
    return schema.validate(data, { abortEarly: false });
};
exports.registerValidation = registerValidation;
//# sourceMappingURL=auth.validation.js.map