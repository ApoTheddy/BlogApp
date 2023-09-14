import { Comment } from 'src/comment/comment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Post' })
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ name: 'content', nullable: false })
  content: string;

  @Column({ name: 'image', nullable: true })
  image?: string;

  @Column({
    name: 'type_publication',
    enum: ['text', 'text-image'],
    default: 'text',
    nullable: true,
  })
  type_publication: string;

  @Column({
    name: 'status',
    enum: ['active', 'inactive'],
    default: 'active',
    nullable: true,
  })
  status: string;

  @Column({ name: 'created_at', default: () => 'GETDATE()', nullable: true })
  created_at: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
