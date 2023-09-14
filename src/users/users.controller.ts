import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CreateUSerDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUSerDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    createUser(@Body() newUser: CreateUSerDto) {
        return this.usersService.createUser(newUser)
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getById(id)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }

    @Put(':id')
    updateuser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUSerDto) {
        return this.usersService.updateUser(id, user)
    }

    @Post(':id/profile')
    createProfile(@Param('id', ParseIntPipe) id: number, @Body() profile: CreateProfileDto) {
        return this.usersService.createProfile(id, profile)
    }
}
