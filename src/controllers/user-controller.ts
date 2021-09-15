import { Request, Response } from "express";
import { UserService } from "../services/user-service";

class UserController {
  async create(req: Request, res: Response) {
    const { email } = req.body;

    const userService = new UserService();

    const user = await userService.create(email);

    return res.json(user);
  }
}

export { UserController };
