import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

}
// TypeORM은 entity를 이용해서 데이터베이스를 생성하기 때문에 entity 파일이 어디있는지 설정에 적어주어야한다.