import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/auth/dto';
import { Prisma } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return await this.categoryService.getCategory();
  }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return await this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() dto: Prisma.CategoryCreateInput) {
    return await this.categoryService.createNewCategory(dto);
  }

  @Patch(':id')
  async updateCategory(@Param('id') id: string, @Body() dto: Prisma.CategoryUpdateInput) {
    return await this.categoryService.updateCategory({
      where: { id_Cate: Number(id) },
      data: dto,
    });
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
