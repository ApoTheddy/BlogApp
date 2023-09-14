import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UserService } from 'src/user/services/user.service';
import { FindPostDto } from '../dto/find-post-query.dto';
import { Post } from '../entities/post.entity';
import { CommentService } from 'src/comment/comment.service';
export declare class PostService {
    private post_repository;
    private readonly user_service;
    private readonly comment_service;
    constructor(post_repository: Repository<Post>, user_service: UserService, comment_service: CommentService);
    find_all({ skip, take }: FindPostDto): Promise<Post[]>;
    find_posts_by_user_id(user_id: number, { skip, take }: FindPostDto): Promise<Post[]>;
    create_post(create_post_dto: CreatePostDto): Promise<Post>;
    find_by_id(post_id: number): Promise<Post>;
    delete_post(post_id: number): Promise<Post>;
}
