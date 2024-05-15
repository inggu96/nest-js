import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from './jwtConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
    this.logger.log('JwtStrategy instantiated');
    console.log('JwtStrategy instantiated');
  }

  async validate(payload: any) {
    this.logger.log(`Payload : ${JSON.stringify(payload)}`);
    if (!payload) {
      this.logger.error('페이로드 값이 없습니다');
      throw new UnauthorizedException();
    }
    const user = await this.authService.validateUserById(payload.sub);
    if (!user) {
      this.logger.error('유저가 없습니다');
      throw new UnauthorizedException();
    }
    return user;
  }
}
