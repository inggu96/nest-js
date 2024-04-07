// import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
// import { Book, Prisma } from '@prisma/client';
// import { BooksService } from './books.service';

// @Controller('books')
// export class BooksController {
//   constructor(private booksService: BooksService) {}
//   @Post()
//   async create(@Body() bookData: Prisma.BookCreateInput): Promise<Book> {
//     return await this.booksService.create(bookData);
//   }

//   @Get()
//   async findAll(): Promise<Book[]> {
//     return this.booksService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<Book | null> {
//     return this.booksService.findOne(+id);
//   }

//   @Put(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() bookData: Prisma.BookUpdateInput,
//   ): Promise<Book> {
//     return this.booksService.update(+id, bookData);
//   }

//   // @Delete(':id')
//   // async remove(@Param('id') id: string): Promise<Book> {
//   //   return this.booksService.remove(+id);
//   // }
// }
