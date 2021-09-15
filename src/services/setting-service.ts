import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/setting";
import { SettingRepository } from "../repositories/setting-repository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingService {
  #settingRepository: Repository<Setting>;

  constructor() {
    this.#settingRepository = getCustomRepository(SettingRepository);
  }

  async create({ chat, username }: ISettingsCreate) {
    const userExists = await this.#settingRepository.findOne({ username });

    if (userExists) throw new Error("User already exists!");

    const settings = this.#settingRepository.create({
      chat,
      username,
    });

    await this.#settingRepository.save(settings);

    return settings;
  }

  async findByUsername(username: string) {
    return this.#settingRepository.findOne({ username });
  }

  async update(username: string, chat: boolean) {
    await this.#settingRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", { username })
      .execute();
  }
}

export { SettingService };
