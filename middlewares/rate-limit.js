import { HttpCode } from "../lib/constants";
import rateLimit from "express-rate-limit";
import { HttpMessage } from "../lib/message";
const limiter = (duration, limit) => {
  return rateLimit({
    windowMs: duration, // 15 minutes
    max: limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
      return res.status(HttpCode.TO_MANY_REQUESTS).json({
        code: HttpCode.TO_MANY_REQUESTS,
        message: HttpMessage.TO_MANY_REQUESTS,
      });
    },
  });
};

export default limiter;
