import { HttpCode } from "../../lib/constants";
import { HttpMessage } from "../../lib/message";
//  import repositoryContacts from "../../repository/contacts";
import AuthService from '../../service/auth/index.js'

const authService = new AuthService();

const registration = async (req, res, next) => {
    const { email}=req.body
    const isUserExist = await authService.isUserExist(email)
    if (isUserExist) { 
        return res
    .status(HttpCode.CONFLICT)
    .json({
        status: HttpMessage.ERROR,
        code: HttpCode.CONFLICT,
        message: HttpMessage.EMAIL_ALREADY_EXIST,
    });
    }
    const data =await authService.create(req.body)
    res
    .status(HttpCode.OK)
    .json({ status: HttpMessage.SUCCESS, code: HttpCode.OK, data });
};

const login = async (req, res, next) => {
 
    res
    .status(HttpCode.OK)
    .json({ status: HttpMessage.SUCCESS, code: HttpCode.OK, data: {}});
};

const logOut = async (req, res, next) => {

    res
    .status(HttpCode.OK)
        .json({ status: HttpMessage.SUCCESS, code: HttpCode.OK, data: {} });
};



export {registration, login,logOut}