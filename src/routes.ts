import { Router } from "express";
import { MessageController } from "./controllers/message-controller";
import { SettingController } from "./controllers/setting-controller";
import { UserController } from "./controllers/user-controller";
const settingController = new SettingController();
const userController = new UserController();
const messageController = new MessageController();

const routes = Router();

routes.post("/settings", settingController.create);
routes.get("/settings/:username", settingController.findByUsername);
routes.put("/settings/:username", settingController.update);

routes.post("/user", userController.create);

routes.post("/message", messageController.create);
routes.get("/messages/:id", messageController.showByUser);

export { routes };
