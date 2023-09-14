import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Reaction {
    reaction_id: number;
    user: User;
    post: Post;
    created_at: string;
}
