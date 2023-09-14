import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/comment/comment.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'firstname',
    nullable: false,
  })
  firstname: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'lastname',
    nullable: false,
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'email',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'username',
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    name: 'birthday',
    nullable: false,
  })
  birthday: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'university',
    nullable: false,
  })
  university: string;

  @Column({
    type: 'varchar',
    length: 80,
    name: 'career',
    nullable: false,
  })
  career: string;

  @Column({
    type: 'varchar',
    name: 'status',
    enum: ['active', 'inactive'],
    default: 'active',
    nullable: true,
  })
  status?: string;

  @Column({
    type: 'varchar',
    name: 'created_at',
    default: () => 'SYSDATETIME()',
    nullable: true,
  })
  created_at?: string;

  @Column({
    type: 'varchar',
    name: 'profile_image',
    nullable: true,
  })
  profile_image?: string;

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];
}
