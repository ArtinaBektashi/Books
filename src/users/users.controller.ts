import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './enums/user.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
    @Get('user')
    @Roles(UserRole.USER)
    @UseGuards(RolesGuard)
    userRoute() {
      // All users can access this route
      return 'Hello user!';
    }
}
