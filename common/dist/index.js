"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPostSchema = exports.createPostSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
//validation schemas
exports.signupSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional(),
});
exports.signinSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.createPostSchema = zod_1.default.object({
    title: zod_1.default.string().min(10),
    content: zod_1.default.string().min(20),
    authorId: zod_1.default.string(),
    thumbnail: zod_1.default.string(),
});
exports.putPostSchema = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string().min(10),
    content: zod_1.default.string().min(20),
    thumbnail: zod_1.default.string(),
});
