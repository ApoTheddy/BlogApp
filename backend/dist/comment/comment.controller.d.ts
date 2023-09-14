import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentController {
    private readonly comment_service;
    constructor(comment_service: CommentService);
    find_all(): Promise<Comment[]>;
    find_by_post_id(post_id: number, skip: number, take: number): Promise<{
        total_comments: number;
        comments: Comment[];
    }>;
    add_comment(create_comment_dto: CreateCommentDto): Promise<Comment>;
}
