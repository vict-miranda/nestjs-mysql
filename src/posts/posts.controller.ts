import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('users')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    createUser(@Body() newPost: CreatePostDto) {
        return this.postService.createPost(newPost)
    }

    @Get()
    getUsers() {
        return this.postService.getPosts()
    }
}
