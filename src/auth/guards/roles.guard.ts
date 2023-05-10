import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/users/enums/user.enum";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly userService: UsersService,) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    
    
    const email = request.user.email;

    const user = await this.userService.getUserByEmail(email);

    
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
