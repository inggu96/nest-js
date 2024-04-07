// import { Injectable } from '@nestjs/common';
// import { Book, Prisma } from '@prisma/client';

// import { PrismaService } from 'src/database/prisma.service';

// @Injectable()
// export class BooksService {
//   constructor(private prisma: PrismaService) {}

//   async create(book: Prisma.BookCreateInput): Promise<Book> {
//     return this.prisma.book.create({
//       data: book,
//     });
//   }

//   async findAll(): Promise<Book[]> {
//     return this.prisma.book.findMany();
//   }

//   async findOne(id: number): Promise<Book | null> {
//     return this.prisma.book.findUnique({
//       where: { id },
//     });
//   }

//   async update(id: number, book: Prisma.BookUpdateInput): Promise<Book> {
//     return this.prisma.book.update({
//       where: { id },
//       data: book,
//     });
//   }

//   async remove(id: number): Promise<void> {
//     await this.prisma.book.delete({
//       where: { id },
//     });
//   }
// }
