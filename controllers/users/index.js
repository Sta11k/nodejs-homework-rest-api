import { HttpCode } from "../../lib/constants";
import { HttpMessage } from "../../lib/message";
import repositoryContacts from "../../repository/contacts";
import {
  UploadFileService,
  // LocalFileService,
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

export { aggregation, uploadAvatar };
