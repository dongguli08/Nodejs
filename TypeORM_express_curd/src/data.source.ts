import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entiry/user"

export const AppDataSource = new DataSource({
    type: "postgres", //데이터 베이스 타입
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "mydb",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
//DB와 연결해주는 부분을 설정함