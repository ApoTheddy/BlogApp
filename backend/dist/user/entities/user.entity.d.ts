import { Comment } from 'src/comment/comment.entity';
import { Post } from 'src/post/entities/post.entity';
export declare class User {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    username: string;
    birthday: string;
    university: string;
    career: string;
    status?: string;
    created_at?: string;
    profile_image?: string;
    posts?: Post[];
    comments?: Comment[];
}
