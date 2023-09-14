import { Injectable , HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private postRepository: Repository<Post>,
                private userService: UsersService) { }

    async createPost(post: CreatePostDto) {
        const userFound = await this.userService.getById(post.authorId)
        if (!userFound) {
            return new HttpException('Usuario no existe', HttpStatus.CONFLICT)
        }
        const newPost = this.postRepository.create(post)
        return await this.postRepository.save(newPost)
    }

    async getPosts() {
        return await this.postRepository.find({
            relations: ['author']
        })
    }
}