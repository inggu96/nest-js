import { Body, Controller, Get, Post } from '@nestjs/common';
import { Phone } from '@prisma/client';
import { CreatePhoneDto } from './dto/create-phone.dto';

import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}
  @Get()
  findAll(): Promise<Phone[]> {
    return this.phoneService.findAll();
  }

  @Post()
  create(@Body() phoneData: CreatePhoneDto): Promise<Phone> {
    return this.phoneService.create(phoneData);
  }
}
