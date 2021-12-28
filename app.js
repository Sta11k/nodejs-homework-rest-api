import express from "express";
import logger from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contacts/index";
import { HttpCode } from "./lib/constants";
import { HttpMessage } from "./lib/message";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
   res
        .status(HttpCode.NOT_FOUND)
        .json({ status:HttpMessage.NOT_FOUND, code:HttpCode.NOT_FOUND, message: HttpMessage.NOT_FOUND });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({status:HttpCode.INTERNAL_SERVER_ERROR, code:HttpMessage.INTERNAL_SERVER_ERROR, message: err.message });
});

export default app;
