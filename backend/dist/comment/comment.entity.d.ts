import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Comment {
    comment_id: number;
    content: string;
    user: User;
    post: Post;
    status: string;
}
