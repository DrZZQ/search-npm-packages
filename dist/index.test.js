"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
index_1.default({
    name: 'test',
    quantity: 20
})
    .then(function (list) {
    console.log(JSON.stringify(list, null, 2));
})
    .catch(function (e) { return console.error(e); });
