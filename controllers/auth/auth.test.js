import { jest } from "@jest/globals";
import { registration } from "./index";
import { HttpCode } from "../../lib/constants";
import { HttpMessage } from "../../lib/message";
import authService from "../../service/auth";

describe("Unit test registration", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { email: "test@test.com", password: "12345678" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
    next = jest.fn();
    authService.create = jest.fn(async (data) => data);
  });

  test("SignUP new User", async () => {
    authService.isUserExist = jest.fn(async () => false);
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(HttpCode.CREATED);
  });

  test("SignUP alredy exist User", async () => {
    authService.isUserExist = jest.fn(async () => true);
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(res.status).toHaveBeenCalledWith(HttpCode.CONFLICT);
  });
  test("SignUP with error database User", async () => {
    const testError = new Error("Database Error");
    authService.isUserExist = jest.fn(async () => {
      throw testError;
    });
    await registration(req, res, next);
    expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
    expect(next).toHaveBeenCalledWith(testError);
  });
});
