import { HttpCode } from "../../lib/constants";
import { HttpMessage } from "../../lib/message";
import repositoryContacts from "../../repository/contacts";
import repositoryUsers from "../../repository/users";
import {
  UploadFileService,
  LocalFileService,
  CloudlFileService,
} from "../../service/file-storage";

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
  const userFromToken = repositoryUsers.findByVerifyToken(verifyToken);

  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true);
    res.status(HttpCode.OK).json({
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

  // const repeatEmailForVerifyUser = async (req, res, next) => {
  //   const uploadService = new UploadFileService(
  //     LocalFileService,
  //     req.file,
  //     req.user
  //   );

  //   const avatarUrl = await uploadService.updateAvatar();
  //   res.status(HttpCode.OK).json({
  //     status: HttpMessage.SUCCESS,
  //     code: HttpCode.OK,
  //     data: { avatarUrl },
  //   });
  // };
};

export { aggregation, uploadAvatar, verifyUser };
