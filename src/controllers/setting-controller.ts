import { Response, Request, response } from "express";
import { SettingService } from "../services/setting-service";

class SettingController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body;

    const settingService = new SettingService();

    try {
      const settings = await settingService.create({ chat, username });

      return res.json(settings);
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params;

    const settingService = new SettingService();

    try {
      const settings = await settingService.findByUsername(username);

      return res.json(settings);
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    const { username } = req.params;
    const { chat } = req.body;

    const settingService = new SettingService();

    await settingService.update(username, chat);
    return res.send("Status updated");
  }
}

export { SettingController };
