"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const category_1 = require("./category");
const article_1 = require("./article");
const user_1 = require("./user");
exports.typeDefs = [
    article_1.typeDefsArticle,
    category_1.typeDefsCategory,
    user_1.typeDefsUser
];
