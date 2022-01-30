import { HttpCode } from "../../lib/constants";
import { HttpMessage } from "../../lib/message";
import repositoryContacts from "../../repository/contacts";
import repositoryUsers from "../../repository/users";
import {
  UploadFileService,
  LocalFileService,
  CloudlFileService,
} from "../../service/file-storage";
import {
  EmailService,
  SenderNodemailer,
  SenderSendgrid,
} from "../../service/email";

const aggregation = async (req, res, next) => {
  const { id } = req.params;
  const data = await repositoryContacts.getStatisticsContacts(id);
  // if (!req.body) {
  //    res.status(400).json({ message: "missing fields" });
  // }
  if (data) {
    return res.status(HttpCode.OK).json({
      status: HttpMessage.SUCCESS,
      code: HttpCode.OK,
      data,
    });
  }

  res.status(HttpCode.NOT_FOUND).json({
    status: HttpMessage.ERROR,
    code: HttpCode.NOT_FOUND,
    message: HttpMessage.NOT_FOUND,
  });
};

const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    // LocalFileService,
    CloudlFileService,
    req.file,
    req.user
  );

  const avatarUrl = await uploadService.updateAvatar();
  res.status(HttpCode.OK).json({
    status: HttpMessage.SUCCESS,
    code: HttpCode.OK,
    data: { avatarUrl },
  });
};

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token;
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);

  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true);

    return res.status(HttpCode.OK).json({
      status: HttpMessage.SUCCESS,
      code: HttpCode.OK,
      data: { message: HttpMessage.SUCCESS },
    });
  }
  res.status(HttpCode.BAD_REQUEST).json({
    status: HttpMessage.INVALID_TOKEN,
    code: HttpCode.BAD_REQUEST,
    data: { message: HttpMessage.INVALID_TOKEN },
  });
};

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await repositoryUsers.findByEmail(email);
  if (user) {
    const { email, name, verifyTokenEmail } = user;

    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderNodemailer()
    );
    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verifyTokenEmail
    );

    if (isSend) {
      return res.status(HttpCode.OK).json({
        status: HttpMessage.SUCCESS,
        code: HttpCode.SUCCESS,
        data: { message: HttpMessage.SUCCESS },
      });
    }
    return res.status(HttpCode.SERVICE_UNAVAILABLE).json({
      status: HttpMessage.ERROR,
      code: HttpCode.SERVICE_UNAVAILABLE,
      data: { message: HttpMessage.SERVICE_UNAVAILABLE },
    });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: HttpMessage.NOT_FOUND,
    code: HttpCode.NOT_FOUND,
    data: { message: HttpMessage.NOT_FOUND },
  });
};
export { aggregation, uploadAvatar, verifyUser, repeatEmailForVerifyUser };
