import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  fildAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto): void {
    return this.catsService.create(createCatDto);
  }
}
