import { Injectable , HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUSerDto } from './dto/create-user.dto';
import { UpdateUSerDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Profile) private profileRepository: Repository<Profile>) { }

    async createUser(user: CreateUSerDto) {
        const userFound = await this.userRepository.findOne({ where: { username: user.username } })
        if (userFound) {
            return new HttpException('Usuario ya existe', HttpStatus.CONFLICT)
        }
        const newUser = this.userRepository.create(user)
        return await this.userRepository.save(newUser)
    }

    async getUsers() {
        return await this.userRepository.find()
    }

    async getById(id: number) {
        const userFound = await this.userRepository.findOneBy({ id: id })
        if (!userFound) {
            return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND)            
        }
        return userFound
    }

    async delete(id: number) {
        const result = await this.userRepository.delete({ id: id })
        if (result.affected === 0) {
            return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND)            
        }
        return result
    }

    async updateUser(id: number, user: UpdateUSerDto) {
        const userFound = await this.userRepository.findOneBy({ id: id })
        if (!userFound) {
            return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND)            
        }

        const updatedUser = Object.assign(userFound, user)
        return await this.userRepository.update({id}, updatedUser)
    }

    async createProfile(id: number, profile: CreateProfileDto) {
        const userFound = await this.userRepository.findOne({ where: { id } })
        if (userFound) {
            return new HttpException('Usuario ya existe', HttpStatus.CONFLICT)
        }
        const newProfile = await this.profileRepository.create(profile)
        const savedProfile = await this.profileRepository.save(newProfile)

        userFound.profile = savedProfile
        return await this.userRepository.update({id}, userFound)
    }
}
