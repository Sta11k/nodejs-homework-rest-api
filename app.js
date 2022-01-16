import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import { HttpCode, LIMIT_JSON } from "./lib/constants";
import { HttpMessage } from "./lib/message";
import contactsRouter from "./routes/contacts/index";
import authRouter from "./routes/auth/index";
import usersRouter from "./routes/users/index";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: LIMIT_JSON }));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  app.set("lang", req.acceptsLanguages(["en", "ua"]));
  next();
});

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: HttpMessage.NOT_FOUND,
    code: HttpCode.NOT_FOUND,
    message: HttpMessage.NOT_FOUND,
  });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: HttpCode.INTERNAL_SERVER_ERROR,
    code: HttpMessage.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

export default app;
