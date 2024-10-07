import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      request.currentUser = decoded;
      switch (decoded.entityTypeuser) {
        case 'nanny':
          // Logika khusus untuk pengguna tipe nanny
          break;
        case 'hospitality':
          // Logika khusus untuk pengguna tipe hospitality
          break;
        case 'parent':
          // Logika khusus untuk pengguna tipe parent
          break;
        default:
          throw new UnauthorizedException('Invalid user role');
      }
      return next.handle();
    } catch (error) {
      throw new UnauthorizedException('Invalid authorization token');
    }
  }
}
