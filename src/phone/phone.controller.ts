import { Body, Controller, Get, Post } from '@nestjs/common';
import { Phone } from '@prisma/client';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PhoneService } from './phone.service';

@ApiTags('유저 전화번호')
@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}
  @Get()
  @ApiOperation({
    summary: '[서비스] 유저 전화번호 조회',
    description: '유저의 전화번호를 조회합니다. 유저만 사용할 수 있습니다.',
  })
  findAll(): Promise<Phone[]> {
    return this.phoneService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: '[서비스] 유저 전화번호 생성',
    description:
      '유저 전화번호를 생성합니다. 유저만 사용할 수 있습니다. 한번 생성했다면 추가 생성할 수 없습니다.',
  })
  create(@Body() phoneData: CreatePhoneDto): Promise<Phone> {
    return this.phoneService.create(phoneData);
  }
}
