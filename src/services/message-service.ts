import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/message";
import { MessageRepository } from "../repositories/message-repository";

interface IMessageCreate {
  admin_id?: string;
  user_id: string;
  text: string;
}

class MessageService {
  #messageRepository: Repository<Message>;

  constructor() {
    this.#messageRepository = getCustomRepository(MessageRepository);
  }

  async create({ user_id, admin_id, text }: IMessageCreate) {
    const message = this.#messageRepository.create({
      admin_id,
      text,
      user_id,
    });

    await this.#messageRepository.save(message);

    return message;
  }

  async listByUser(user_id: string) {
    const list = await this.#messageRepository.find({
      where: { user_id },
      relations: ["user"],
    });

    return list;
  }
}

export { MessageService };
