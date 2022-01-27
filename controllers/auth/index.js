import { HttpCode } from "../../lib/constants";
import { HttpMessage } from "../../lib/message";
import authService from "../../service/auth/index.js";
import { CustomError } from "../../lib/custom-error";
import {
  EmailService,
  SenderNodemailer,
  SenderSendgrid,
} from "../../service/email";

const registration = async (req, res, next) => {
  try {
    const { email } = req.body;

    const isUserExist = await authService.isUserExist(email);
    if (isUserExist) {
      throw new CustomError(HttpCode.CONFLICT, HttpMessage.EMAIL_ALREADY_EXIST);
    }
    const userData = await authService.create(req.body);
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendgrid()
    );
    const isSend = await emailService.sendVerifyEmail(
      email,
      userData.name,
      userData.verifyTokenEmail
    );
    delete userData.verifyTokenEmail;

    res.status(HttpCode.CREATED).json({
      status: HttpMessage.SUCCESS,
      code: HttpCode.CREATED,
      data: { ...userData, isSendEmailVerify: isSend },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);

  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: HttpMessage.ERROR,
      code: HttpCode.UNAUTHORIZED,
      message: HttpMessage.UNAUTHORIZED,
    });
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);
  res
    .status(HttpCode.OK)
    .json({ status: HttpMessage.SUCCESS, code: HttpCode.OK, data: { token } });
};

const logOut = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res
    .status(HttpCode.NO_CONTENT)
    .json({ status: HttpMessage.NO_CONTENT, code: HttpCode.OK, data: {} });
};

export { registration, login, logOut };
//