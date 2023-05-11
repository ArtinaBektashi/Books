import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';

export const GetCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Users => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);