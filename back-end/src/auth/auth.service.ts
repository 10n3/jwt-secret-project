import * as bcrypt from 'bcrypt';

import {ConflictException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import {User} from "./interfaces/user.interface";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>,
                private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({ username, password: hashedPassword });

        try {
            await user.save();
        } catch (error) {
            if(error.code === 11000) {
                throw new ConflictException('User already exist');
            }
            throw error;
        }
    }

    async signIn(user: User) {
        const payload = {username: user.username, sub: user._id};
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ username });

        if(!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if(valid) {
            return user;
        }

        return null;
    }
}