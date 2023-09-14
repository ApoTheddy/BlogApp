import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostService } from 'src/post/services/post.service';
import { UserService } from 'src/user/services/user.service';
import { FindPostDto } from 'src/post/dto/find-post-query.dto';
export declare class CommentService {
    private comment_repository;
    private readonly post_service;
    private readonly user_service;
    constructor(comment_repository: Repository<Comment>, post_service: PostService, user_service: UserService);
    find_all(): Promise<Comment[]>;
    find_by_post_id(post_id: number, { skip, take }: FindPostDto): Promise<{
        total_comments: number;
        comments: Comment[];
    }>;
    add_comment(create_comment_dto: CreateCommentDto): Promise<Comment>;
}
