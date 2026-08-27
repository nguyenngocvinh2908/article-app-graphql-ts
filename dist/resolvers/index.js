"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const article_1 = require("./article");
const category_1 = require("./category");
const user_1 = require("./user");
exports.resolvers = [
    article_1.resolversArticle,
    category_1.resolversCategory,
    user_1.resolversUser
];
