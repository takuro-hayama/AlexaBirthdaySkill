"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const birthdays_json_1 = __importDefault(require("./resources/birthdays.json"));
let handler = async (event, context) => {
    let personsName = event.pathParameters && event.pathParameters.name;
    console.log(personsName);
    if (!personsName) {
        return { statusCode: 400, body: 'Bad Request' };
    }
    console.log(personsName);

    personsName = decodeURI(personsName);
    console.log(personsName);
    
    const birthdayInfo = birthdays_json_1.default.find(birthdayInfo => {
        return birthdayInfo.name === personsName;
    });
    if (!birthdayInfo) {
        return { statusCode: 404, body: 'Not Found' };
    }
    console.log(birthdayInfo);
    return { statusCode: 200, body: JSON.stringify(birthdayInfo) };
};
exports.handler = handler;
