"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = require("path");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.static("express"));
app.get("/", (request, response) => {
    response.status(200).sendFile(path.join(__dirname + "/index.html"));
});
app.get("/chess.css", (request, response) => {
    response.status(200).sendFile(path.join(__dirname + "/chess.css"));
});
app.get("/engine.js", (request, response) => {
    response.status(200).sendFile(path.join(__dirname + "/engine.js"));
});
app.get("/pieces/:file", (request, response) => {
    response.status(200).sendFile(path.join(__dirname + "/pieces/" + request.params.file));
});
app.listen(port, () => {
    console.log(`[SERVER]: Server is running on http://localhost:${port}`);
});
