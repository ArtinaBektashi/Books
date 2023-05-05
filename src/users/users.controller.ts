import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './enums/user.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

    
@Controller('users')
export class UsersController {
    @Get('user')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.USER)
    userRoute() {
      // All users can access this route
      return 'Hello user!';
    }
}
