import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { dataSource } from "../../../../database/dataSource";

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private repositoryUser: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(Game);
    this.repositoryUser = dataSource.getRepository(User);
    
    //getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {

    return await this.repository
      .createQueryBuilder("games")
      .where("games.title = :title", { title:param })
      .getRawMany()     
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`SELECT count(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
     
    const users = await this.repositoryUser.createQueryBuilder("users")
    .leftJoinAndSelect("users.games", "games")
    .where("user.games = :id", { id: id })
    .getMany()
    
    return users;
      // Complete usando query builder
  }
}
