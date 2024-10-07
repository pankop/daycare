import { SetMetadata } from '@nestjs/common';

export const EntityType = (...entityTypes: string[]) =>
  SetMetadata('entityType', entityTypes);
