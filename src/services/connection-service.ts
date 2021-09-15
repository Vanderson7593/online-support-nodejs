import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/connection";
import { ConnectionRepository } from "../repositories/connection-repository";

interface IConnectionCreate {
  user_id: string;
  socket_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionService {
  #connectionRepository: Repository<Connection>;

  constructor() {
    this.#connectionRepository = getCustomRepository(ConnectionRepository);
  }

  async create({ user_id, admin_id, socket_id, id }: IConnectionCreate) {
    const connection = this.#connectionRepository.create({
      id,
      user_id,
      admin_id,
      socket_id,
    });

    await this.#connectionRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    return this.#connectionRepository.findOne({ user_id });
  }
}

export { ConnectionService };
