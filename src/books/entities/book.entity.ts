import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'book' })
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  deletedAt: Date;
}
// TypeORM이란 프로그래밍 언어를 사용하여 테이블을 객체로 매핑할수있게 해주고 sql 작성을 가능하게 하는것
// 데이터베이스 데이터 <- 매핑 -> Object 필드
// TypeORM을 사용하면 데이터베이스 테이블을 클래스로 정의할 수 있는데 , 이 클래스를 엔티티(Entity)라고 한다
// 엔티티란 데이터베이스 테이블을 객체로 표현한 것
