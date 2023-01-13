import {  Repository } from 'typeorm';
import { dataSource } from "../../../../database/dataSource";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async findUserWithGamesById({user_id,  }: IFindUserWithGamesDTO): Promise<User> {

    //const user = await this.repository.findOneBy({id:user_id})
      
      const  user_game  = await this.repository.find({
          relations: {
              games: true,
          },
      })

      const user = user_game.find(g => g.id = user_id);
      if(!user){
        throw new Error("Usuário não existe");
      }
    return user;

  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`SELECT * FROM users ORDER BY first_name`); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`SELECT * FROM users ORDER BY first_name= $first_name and last_name = $last_name`); // Complete usando raw query
  }
}
