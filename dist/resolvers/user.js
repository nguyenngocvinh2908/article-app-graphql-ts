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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const md5_1 = __importDefault(require("md5"));
const generate_1 = require("../helpers/generate");
exports.resolversUser = {
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const emailExist = yield user_1.default.findOne({ email: user.email, deleted: false });
            if (emailExist) {
                return {
                    code: 400,
                    message: "Email is exist"
                };
            }
            else {
                const newUser = new user_1.default(Object.assign(Object.assign({}, user), { password: (0, md5_1.default)(user.password), token: (0, generate_1.generateRandomString)(30) }));
                const data = yield newUser.save();
                return {
                    code: 200,
                    massage: "Success",
                    id: data._id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token
                };
            }
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const infoUser = yield user_1.default.findOne({ email: user.email, deleted: false });
            if (!infoUser) {
                return {
                    code: 400,
                    message: "Email is not exist"
                };
            }
            if (infoUser.password !== (0, md5_1.default)(user.password)) {
                return {
                    code: 400,
                    message: "Password is not correct"
                };
            }
            return {
                code: 200,
                message: "Success",
                id: infoUser._id,
                token: infoUser.token,
                fullName: infoUser.fullName
            };
        })
    },
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const infoUser = yield user_1.default.findOne({ token: context.user.token, deleted: false });
            if (!infoUser) {
                return {
                    code: 400,
                    message: "Unsuccess"
                };
            }
            else {
                return {
                    code: 200,
                    message: "Success",
                    fullName: infoUser.fullName,
                    email: infoUser.email,
                    id: infoUser._id,
                    token: infoUser.token
                };
            }
        })
    }
};
