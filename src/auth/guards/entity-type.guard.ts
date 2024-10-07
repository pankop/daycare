// entity-type.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class EntityTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredEntity = this.reflector.get<string[]>(
      'entityType',
      context.getHandler(),
    );
    if (!requiredEntity) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return requiredEntity.includes(user.entityType); // Memvalidasi entityType dari JWT
  }
}
