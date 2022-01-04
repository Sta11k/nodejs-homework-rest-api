import jwt from "jsonwebtoken";
import { HttpCode } from "../lib/constants";
import { HttpMessage } from "../lib/message";
import repositoryUsers from "../repository/users";
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return !!verify;
  } catch (e) {
    return false;
  }
};
const guard = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: HttpMessage.ERROR,
      code: HttpCode.UNAUTHORIZED,
      message: HttpMessage.NOT_AUTHORIZED,
    });
  }
  const payload = jwt.decode(token);
  const user = await repositoryUsers.findById(payload.id);

  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: HttpMessage.ERROR,
      code: HttpCode.UNAUTHORIZED,
      message: HttpMessage.NOT_AUTHORIZED,
    });
  }

  req.user = user;
  // res.locals.user = user;
  next();
};

export default guard;
