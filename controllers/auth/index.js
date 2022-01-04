import { HttpCode } from "../../lib/constants";
import { HttpMessage } from "../../lib/message";
//  import repositoryContacts from "../../repository/contacts";
import AuthService from "../../service/auth/index.js";

const authService = new AuthService();

const registration = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: HttpMessage.ERROR,
      code: HttpCode.CONFLICT,
      message: HttpMessage.EMAIL_ALREADY_EXIST,
    });
  }
  const data = await authService.create(req.body);
  res
    .status(HttpCode.OK)
    .json({ status: HttpMessage.SUCCESS, code: HttpCode.OK, data });
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
