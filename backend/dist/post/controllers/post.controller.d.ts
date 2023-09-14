import { PostService } from '../services/post.service';
import { Post as PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
export declare class PostController {
    private readonly post_service;
    constructor(post_service: PostService);
    find_all(skip: number, take: number): Promise<PostEntity[]>;
    find_by_id(post_id: number): Promise<PostEntity>;
    find_posts_by_user_id(user_id: number, skip: number, take: number): Promise<PostEntity[]>;
    create_post(create_post_dto: CreatePostDto): Promise<PostEntity>;
    delete_post(post_id: number): Promise<PostEntity>;
}
