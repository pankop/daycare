import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
    }
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return next();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      req.currentUser = decoded;

      switch (decoded.entityType) {
        case 'nanny':
          // Logika khusus untuk pengguna tipe nanny
          break;
        case 'parent':
          // Logika khusus untuk pengguna tipe parent
          break;
        case 'hospitality':
          // Logika khusus untuk pengguna tipe hospitality
          break;
      }

      next();
    } catch (error) {
      return next();
    }
  }
}
