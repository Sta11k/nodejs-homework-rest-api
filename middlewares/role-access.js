import { HttpCode } from "../lib/constants";
import { HttpMessage, FORBIDDEN } from "../lib/message";

const guard = (role) => async (req, res, next) => {
  const roleCurrentUser = req.user.role;
  if (roleCurrentUser !== role) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: HttpMessage.ERROR,
      code: HttpCode.FORBIDDEN,
      message: FORBIDDEN[req.app.get("lang")],
    });
  }

  // res.locals.user = user;
  next();
};

export default guard;
