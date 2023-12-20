import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma, Product } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';

import { storageConfig } from './configImage';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) { }

  //get image
  @Get('/getimage/:proid/:image')
  display(
    @Res() res,
    @Param('proid') proid: string,
    @Param('image') image: string,
  ) {
    res.sendFile(image, { root: `./uploads/product/${proid}` });
  }

  @Get('/images/:proid')
  async getImageProduct(@Param('proid') proid: string): Promise<any> {
    const imagePath = path.join(__dirname, `../../uploads/product/${proid}`);

    // Đọc danh sách các tệp ảnh trong thư mục
    const imageFiles = fs.readdirSync(imagePath);

    // Xây dựng đường dẫn đầy đủ đến từng ảnh và trả về chúng dưới dạng URL
    const imageUrls = imageFiles.map(
      (filename) =>
        `http://localhost:8080/product/getimage/${proid}/${filename}`,
    );

    return imageUrls;
  }

  @Get('/folder/:newfolderName')
  async getFolders(@Param('newfolderName') newfolderName: string) {
    try {
      const folderPath = `uploads/product/${newfolderName}`;
      fs.mkdirSync(folderPath);
      const folder = 'uploads/product';
      const folders = fs
        .readdirSync(folder)
        .filter((item) => fs.statSync(path.join(folder, item)).isDirectory());
      return folders;
    } catch (error) {
      console.error(`Error listing folders: ${error.message}`);
      return [];
    }
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Get('/categorys/:category')
  async getProductByCategory(@Param('category') category: string) {
    return await this.productService.getProductByCategory(category);
  }

  // upload images
  @Post('/uploadImage/:productId')
  @UseInterceptors(FilesInterceptor('file', 10, { storage: storageConfig() }))
  async createNewProduct(
    @Param('productId') productId: string,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    try {
      const checkProduct = await this.productService.getProductById(productId);
      if (checkProduct) {
        return file;
      } else throw new Error('Product');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post()
  async createProduct(
    @Body()
    productData: Prisma.ProductCreateInput,
  ): Promise<Product> {
    return await this.productService.createProduct(productData);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body()
    dto: Prisma.ProductUpdateInput,
  ) {
    return await this.productService.updateProduct({
      where: { id_Pro: Number(id) },
      data: dto,
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<object> {
    return await this.productService.deleteProduct(Number(id));
  }

  @Get('/search/:name')
  async searchProduct(@Param('name') name: string) {
    return await this.productService.SearchProduct(name);
  }
}
