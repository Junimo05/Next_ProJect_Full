import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { updateInfoDto } from 'src/auth/dto/updateInfo.dto';

@Injectable({})
export class UserService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) { }

  async UpdatePasswordUser(id: number, dto: UpdateDto, token: any) {
    if (token.role === this.config.get('SUPPER_PERMISSIONS')) {
      return await this.prisma.user.update({
        where: { id_User: id },
        data: dto,
      });
    } else {
      try {
        const uname = String(token.username);
        const user = await this.prisma.user.findFirst({
          where: {
            id_User: id,
            username: uname,
          },
        });
        if (!user) {
          return {
            msg: 'can not update user with infomation token',
          };
        }
        //check if old password not equal new password
        const passwordMathes: boolean = await argon2.verify(
          user.password,
          dto.oldPassword,
        );
        if (!passwordMathes) {
          return {
            msg: 'old password not match',
          };
        }
        //check if user exist and old password is correct
        if (user && passwordMathes) {
          const hash = await argon2.hash(dto.newPassword);
          const update = await this.prisma.user.update({
            where: {
              id_User: id,
              username: uname,
            },
            data: {
              password: hash,
            },
          });
          return update;
        }
      } catch (error) {
        throw new ForbiddenException('invalid!');
      }
    }
    // check if new password equal old password
  }

  async UpdateInfoUser(id: number, dto: any, token: any) {
    if (token.role === 'admin') {
      try {
        console.log('data =', dto);
        const abc = await this.prisma.user.update({
          where: { id_User: id },
          data: dto,
        });
        if (abc) return abc;
      } catch (error) {
        throw new Error('cannot update info user');
      }
    } else {
      try {
        const uname = String(token.username);
        const user = await this.prisma.user.findFirst({
          where: {
            id_User: id,
            username: uname,
          },
        });
        if (!user) {
          return {
            msg: 'can not update user with infomation token',
          };
        } else {
          try {
            const res = await this.prisma.user.update({
              where: { id_User: id },
              data: dto,
            });
            if (res) {
              return res;
            }
          } catch (error) {
            throw new ForbiddenException(
              'can not update infomation user, please try again!',
            );
          }
        }
      } catch (error) {
        throw new ForbiddenException('invalid!');
      }
    }
  }

  async DeleteUser(id: string, user: any) {
    const idDelete = Number(id);
    if (user.role === 'admin') {
      try {
        console.log('delete with admin role');
        const find_order = await this.prisma.order.findMany({
          where: {
            OR: [
              {
                id_Cus: idDelete,
              },
              {
                id_Staff: idDelete,
              },
            ],
          },
        });
        if (find_order) {
          console.log('find the _order');
          const data = [];
          find_order.forEach((item) => data.push(item.id_Order));
          console.log(data[0]);
          const res1 = await this.prisma.order_Product.deleteMany({
            where: {
              id_Order: {
                in: data,
              },
            },
          });
          if (res1) {
            console.log('delete the order');
            const deteleOrder = await this.prisma.order.deleteMany({
              where: {
                OR: [
                  {
                    id_Cus: idDelete,
                  },
                  {
                    id_Staff: idDelete,
                  },
                ],
              },
            });
            const res2 = await this.prisma.review.deleteMany({
              where: {
                id_Cus: idDelete,
              },
            });
            if (res2) {
              console.log('delete the review', res2);
            }
            const res4 = await this.prisma.cart.deleteMany({
              where: {
                id_Cus: idDelete,
              },
            });
            if (res4) {
              console.log('delete the cart', res4);
            }
            const deleteUser = await this.prisma.user.delete({
              where: {
                id_User: idDelete,
              },
            });

            if (deleteUser) {
              console.log('deleted');
              return deleteUser;
            }
          }
        }
      } catch (error) {
        throw new Error('invalid your role admin can not enough permissions');
      }
    }
  }

  async GetAllUser() {
    return await this.prisma.user.findMany();
  }

  async getById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id_User: id,
        },
      });
      if (user) {
        return user;
      } else {
        return {
          msg: 'User not found by id = ' + id,
        };
      }
    } catch (error) {
      throw new Error('can not get review by id ' + id);
    }
  }
}
