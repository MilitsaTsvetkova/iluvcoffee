import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly hashingService: HashingService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async signup(signupDto: SignUpDto) {
    try {
      const user = new User();
      user.email = signupDto.email;
      user.password = await this.hashingService.hash(signupDto.password);
      await this.userRepository.save(user);
    } catch (error) {
      const pgUniqueViolationErrorCode = '23505';
      if (error?.code === pgUniqueViolationErrorCode) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }
    return true;
  }
}
