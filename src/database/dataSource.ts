/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";
import { Game } from "../modules/games/entities/Game";
import { User } from "../modules/users/entities/User";
import { migration1673321678240 } from "./migrations/migration";

const dataSource = new DataSource({
  type:"postgres",
  host:"localhost",
  port:5432,
  username:"postgres",
  password: "docker",
  database:"queries_challenge",
  entities:[Game,  User],
  // eslint-disable-next-line spaced-comment
  //migrations:["./src/database/migrations/*.ts"],
  migrations:[
    migration1673321678240
            ],
  cli: {
     migrationsDir: "./src/database/migrations/"
}
})


export function createConnection(
    host = 'database',
  ): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
  }

  export { dataSource};