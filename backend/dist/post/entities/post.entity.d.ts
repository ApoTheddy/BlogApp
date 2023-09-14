import { Comment } from 'src/comment/comment.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Post {
    post_id: number;
    content: string;
    image?: string;
    type_publication: string;
    status: string;
    created_at: string;
    user: User;
    comments: Comment[];
}
