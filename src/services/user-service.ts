import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

class UserService {
  #userRepository: Repository<User>;

  constructor() {
    this.#userRepository = getCustomRepository(UserRepository);
  }

  async create(email: string) {
    const userExists = await this.#userRepository.findOne({ email });

    if (userExists) return userExists;

    const user = this.#userRepository.create({ email });

    await this.#userRepository.save(user);

    return user;
  }

  async findByEmail(email: string) {
    return await this.#userRepository.findOne({ email });
  }
}

export { UserService };
