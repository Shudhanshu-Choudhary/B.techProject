import * as express from "express";
import { Router } from "express/lib/router";
import AuthService from "../services/AuthService";
import { IUser } from "../db/models/user";
import ServiceResponse from "../services/ServiceResponse";

const router: Router = express.Router();

router.get("/", function (req, res) {
  res.send("Birds home page");
});

router.post("/register",  async (req, res) => {
  const body: any = req.body;
  try {
    const user: IUser = await AuthService.register(body);
    res.send(user);
  } catch (e) {
    ServiceResponse.sendError(e, res);
  }
});

router.post("/login",  async (req, res) => {
  const body: any = req.body;
  try {
    const user: IUser | void = await AuthService.login(body);
    res.send(user);
  } catch (e) {
    ServiceResponse.sendError(e, res);
  }
});

export default router;
