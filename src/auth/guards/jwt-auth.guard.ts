import {
  Injectable,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.log(`Handling request for ${request.url}`);
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      this.logger.error(
        `Authentication failed: ${err || info || 'User not found'}`,
      );
      throw err || new UnauthorizedException();
    }
    this.logger.log(`User authenticated: ${user.email}`);
    return user;
  }
}
