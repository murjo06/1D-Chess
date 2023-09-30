import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path = require("path");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.static("express"));

app.get("/", (request: Request, response: Response) => {
    response.status(200).sendFile(path.join(__dirname + "/index.html"));
});
app.get("/chess.css", (request: Request, response: Response) => {
    response.status(200).sendFile(path.join(__dirname + "/chess.css"));
});
app.get("/engine.js", (request: Request, response: Response) => {
    response.status(200).sendFile(path.join(__dirname + "/engine.js"));
});
app.get("/pieces/:file", (request: Request, response: Response) => {
    response.status(200).sendFile(path.join(__dirname + "/pieces/" + request.params.file));
});

app.listen(port, () => {
    console.log(`[SERVER]: Server is running on http://localhost:${port}`);
});