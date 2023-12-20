import {
  Controller,
  Get,
  UseGuards,
  Req,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto, UpdateDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { updateInfoDto } from 'src/auth/dto/updateInfo.dto';
// import { AuthGuard } from '@nestjs/passport';

// import { Request } from 'express';
// import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  //get all user
  @Get('all')
  getAllUser(): Promise<User[]> {
    return this.service.GetAllUser();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(Number(id));
  }

  //handle update user
  @UseGuards(AuthGuard)
  @Patch('changepassword/:id')
  async changepassword(
    @Param('id') id: string,
    @Body() dto: UpdateDto,
    @GetUser() user: Request,
  ) {
    return await this.service.UpdatePasswordUser(+id, dto, user);
  }

  @UseGuards(AuthGuard)
  @Patch('changeinfo/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: any,
    @GetUser() user: Request,
  ) {
    return await this.service.UpdateInfoUser(+id, dto, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @GetUser() user: Request) {
    return await this.service.DeleteUser(id, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@GetUser() user: Request) {
    return user;
  }
}
