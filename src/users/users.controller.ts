import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './enums/user.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UsersService } from './users.service';

    
@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService){}
    @Get('user')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.USER)
    userRoute() {
      // All users can access this route
      return 'Hello user!';
    }

    @Post('updateUser/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateRole(@Param('id') id: number, @Body('role') role: string){
        return await this.usersService.updateUsersRole(id,role as UserRole);
    }
}
