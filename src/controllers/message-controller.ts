import { Request, Response } from "express";
import { MessageService } from "../services/message-service";

class MessageController {
  async create(req: Request, res: Response) {
    const { text, admin_id, user_id } = req.body;

    const messageService = new MessageService();

    const message = await messageService.create({
      text,
      admin_id,
      user_id,
    });

    return res.json(message);
  }

  async showByUser(req: Request, res: Response) {
    const { id } = req.params;

    const messageService = new MessageService();

    const messages = await messageService.listByUser(id);

    return res.json(messages);
  }
}

export { MessageController };
